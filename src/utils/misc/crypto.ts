import JSEncrypt from 'jsencrypt'

const fakeKey =
  'TUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF0RGVKx=oamdraURIVW03YkU1UG84Z0JxV3NDcEJMU2RMM0RLREM=x=odVdNbWpNOE9BYStVZw==x=ocGxQZk94Zis1K0t3dGRNRFRhVUFkeA==x=oNWxwbkVsUVh6U0E4aG1Lc05CbXFIOUd0MFhVQWZxSTJaN24xd1dDQTB2bVdBNzJ4TTRmT2dzK3pwWXk0c2JNx=ocGRhWk0xVGJoRGptTDJLU2h1UnZaQWRwdXorQm03UXdLcE1rQnNobU84UGRYWXV3YWhORm11UlVHVTJaQWJTa0tiMGw3Y2J6djUwWTJQx=ocE5hbUNkYllyOU9xamc=x=oaU9yekpOY1R6Q2lZNEhlRGpkV2F1MHJkOFRHZklieGF2cTdMdHBWNkloRnlMb0EzN2dvTkpjeEVDWUE=x=oRHF5aUVWcGlkOGplbCtqRUtLOVZHaTJZU0ZrVm00Z3lveGJjUWhoNElkNDVzS1Zad0lEQVFBQg=='

export const crypto = new JSEncrypt({})

const publicKey = fakeKey
  .split(atob('eD1v'))
  .map((str) => {
    let s = ''
    try {
      s = atob(str)
    } catch (e) {
      s = str
    }
    return s
  })
  .join('/')

crypto.setPublicKey(publicKey)
