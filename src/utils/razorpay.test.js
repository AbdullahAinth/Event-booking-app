import { loadRazorpayScript, openRazorpayCheckout } from './razorpay';

describe('loadRazorpayScript', () => {
  let mockScript;

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();

    mockScript = {
      set src(value) {
        if (value.includes('checkout.js')) {
          setTimeout(() => {
            if (mockScript.shouldFail) {
              mockScript.onerror();
            } else {
              mockScript.onload();
            }
          }, 10);
        }
      },
      onload: () => {},
      onerror: () => {},
    };

    jest.spyOn(document, 'createElement').mockImplementation(() => mockScript);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should return true if script already exists', async () => {
    // Simulate the script already existing
    jest.spyOn(document, 'querySelector').mockReturnValue({
      src: 'https://checkout.razorpay.com/v1/checkout.js',
    });
  
    const result = await loadRazorpayScript();
    expect(result).toBe(true);
  });
  

  it('should load Razorpay script successfully when script is not present', async () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null);
    mockScript.shouldFail = false;

    const resultPromise = loadRazorpayScript();
    jest.advanceTimersByTime(20);
    const result = await resultPromise;

    expect(result).toBe(true);
    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(document.body.appendChild).toHaveBeenCalledWith(mockScript);
  });

  it('should return false if script fails to load', async () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null);
    mockScript.shouldFail = true;

    const resultPromise = loadRazorpayScript();
    jest.advanceTimersByTime(20);
    const result = await resultPromise;

    expect(result).toBe(false);
    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(document.body.appendChild).toHaveBeenCalledWith(mockScript);
  });

  it('should not create script if already exists', async () => {
    jest.spyOn(document, 'querySelector').mockReturnValue({
      src: 'https://checkout.razorpay.com/v1/checkout.js',
    });

    const createSpy = jest.spyOn(document, 'createElement');
    const result = await loadRazorpayScript();

    expect(result).toBe(true);
    expect(createSpy).not.toHaveBeenCalled();
  });
});

describe('openRazorpayCheckout', () => {
  it('should create Razorpay instance and open it', () => {
    const mockOpen = jest.fn();
    const mockOptions = { key: 'test', amount: 1000 };

    window.Razorpay = jest.fn().mockImplementation(() => ({
      open: mockOpen,
    }));

    openRazorpayCheckout(mockOptions);

    expect(window.Razorpay).toHaveBeenCalledWith(mockOptions);
    expect(mockOpen).toHaveBeenCalled();
  });
});
