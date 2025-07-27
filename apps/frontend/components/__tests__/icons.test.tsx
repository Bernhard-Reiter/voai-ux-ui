import { Icons } from '../icons'

describe('Icons', () => {
  it('should export all required icons', () => {
    expect(Icons.sun).toBeDefined()
    expect(Icons.moon).toBeDefined()
    expect(Icons.spinner).toBeDefined()
    expect(Icons.chevronLeft).toBeDefined()
    expect(Icons.chevronRight).toBeDefined()
    expect(Icons.close).toBeDefined()
    expect(Icons.check).toBeDefined()
    expect(Icons.info).toBeDefined()
    expect(Icons.alertCircle).toBeDefined()
    expect(Icons.alertTriangle).toBeDefined()
  })
})
