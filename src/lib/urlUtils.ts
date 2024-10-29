// Define the return types
export interface ValidUrlResult {
  isValid: true;
  url: string;
  hostname: string;
}

export interface InvalidUrlResult {
  isValid: false;
  error: string;
  originalInput: string;
}

export type UrlValidationResult = ValidUrlResult | InvalidUrlResult;

// URL validation and formatting function
export function formatAndValidateUrl(input: string): UrlValidationResult {
  console.log(input, 11);
  // Remove leading/trailing whitespace and any line breaks
  let url = input.trim().replace(/[\n\r]/g, '');
  
  // Regular expressions for validation
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
  
  try {
    // Case 1: Just a domain (e.g., "example.com")
    if (domainRegex.test(url)) {
      url = `https://${url}`;
    }
    // Case 2: Starts with www but no protocol
    else if (url.startsWith('www.')) {
      url = `https://${url}`;
    }
    // Case 3: Has valid structure but no protocol
    else if (urlRegex.test(url) && !url.startsWith('http')) {
      url = `https://${url}`;
    }

    // Final validation using URL constructor
    const urlObject = new URL(url);
    
    // Additional validation for common issues
    if (!urlObject.hostname.includes('.')) {
      throw new Error('Invalid domain format');
    }
    
    return {
      isValid: true,
      url: url,
      hostname: urlObject.hostname
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Please enter a valid URL format. Examples:\n- example.com\n- www.example.com\n- https://example.com',
      originalInput: input
    };
  }
}
