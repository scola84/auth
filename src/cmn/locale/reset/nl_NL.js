import { HtmlBuilder } from '@scola/lib'

HtmlBuilder.snippet.misc.Print.addStrings({
  nl_NL: {
    auth: {
      reset: {
        confirm: {
          form: {
            label: {
              password: {
                new: 'Nieuw wachtwoord',
                repeat: 'Herhaal wachtwoord'
              }
            }
          },
          status: {
            default: 'Voer hieronder een [sterk wachtwoord](https://veiliginternetten.nl/themes/basisbeveiliging/situatie/mijn-wachtwoord-123456/?type=q) in van minimaal 8 tekens.'
          }
        },
        msg: {
          from: 'root@localhost',
          html: '<html><body><div style="border: 1px solid darkgrey; margin: auto; text-align: center; width: 50%;">%(text)m</div></body></html>',
          subject: 'Wachtwoord wijzigen',
          text: 'U kunt uw wachtwoord wijzigen door op de onderstaande link te klikken:\n\n**[Wachtwoord wijzigen](http://localhost:3000/%(link)s)**\n\nDeze link is **%(token.duration)l[d;dur]** dagen geldig.'
        },
        request: {
          form: {
            label: {
              email: 'E-mailadres'
            }
          },
          route: 'Wachtwoord vergeten?',
          status: {
            default: 'Voer hieronder uw gegevens in en verstuur het formulier. U ontvangt dan een e-mail met daarin verdere uitleg.',
            failure: {
              reset: {
                confirm: 'Uw wachtwoord kon niet worden gewijzigd. Vraag met het formulier hieronder een nieuwe link aan.',
                check: 'De link die u hebt gebruikt, is niet geldig. Vraag met het formulier hieronder een nieuwe link aan.'
              }
            },
            success: 'Als uw gegevens zijn gevonden, dan is een e-mail verstuurd met daarin verdere uitleg.'
          }
        }
      }
    }
  }
})
