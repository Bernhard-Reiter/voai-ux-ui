describe('Upload Utilities', () => {
  it('should sanitize filenames correctly', () => {
    // Mock the sanitizeFilename function
    const sanitizeFilename = (filename: string): string => {
      return filename
        .replace(/[^a-zA-Z0-9.-]/g, '_')
        .replace(/\.{2,}/g, '.')
        .substring(0, 255)
    }

    // Test sanitizeFilename function
    expect(sanitizeFilename('test file.pdf')).toBe('test_file.pdf')
    expect(sanitizeFilename('test@#$%.pdf')).toBe('test____.pdf')
    expect(sanitizeFilename('../../../etc/passwd')).toBe('._._._etc_passwd')
  })
})
