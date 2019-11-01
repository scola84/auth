import { HtmlBuilder } from '@scola/lib'

HtmlBuilder.snippet.misc.Print.addStrings({
  nl_NL: {
    auth: {
      register: {
        confirm: {
          status: {
            failure: 'Uw aanmelding kon niet worden bevestigd.',
            success: 'Uw aanmelding is bevestigd.'
          }
        },
        msg: {
          from: 'root@localhost',
          html: '<html><body><div style="border: 1px solid darkgrey; margin: auto; text-align: center; width: 50%;">%(text)m</div></body></html>',
          subject: 'Aanmelden',
          text: 'U kunt uw aanmelding bevestigen door op de onderstaande link te klikken:\n\n**[Aanmelding bevestigen](http://localhost:3000/%(link)s)**\n\nDeze link is **%(token.duration)l[d;dur]** dagen geldig.'
        },
        request: {
          form: {
            label: {
              email: 'E-mailadres',
              password: 'Gebruikersnaam'
            }
          },
          route: 'Aanmelden',
          status: {
            401: 'U kon niet worden aangemeld. Probeer het opnieuw.',
            default: 'Voer hieronder uw gegevens in om u aan te melden.'
          }
        }
      }
    }
  }
})
