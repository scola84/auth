import { HtmlBuilder } from '@scola/lib'

HtmlBuilder.snippet.misc.Print.addStrings({
  nl_NL: {
    auth: {
      login: {
        confirm: {
          form: {
            label: {
              code: 'Code'
            }
          },
          status: {
            success: 'Er is een e-mail verstuurd met daarin een beveiligingscode. Vul die code hieronder in en verstuur het formulier.'
          }
        },
        request: {
          form: {
            label: {
              email: 'E-mailadres',
              password: 'Wachtwoord',
              remember: 'Laat mij ingelogd blijven'
            }
          },
          msg: {
            from: 'root@localhost',
            html: '<html><body><div style="border: 1px solid darkgrey; margin: auto; text-align: center; width: 50%;">%(text)m</div></body></html>',
            subject: 'Inloggen',
            text: 'U kunt inloggen met de volgende beveiligingscode:\n\n**%(code)s**\n\nDeze code is **%(token.duration)l[m;dur] minuten** geldig.\n\nAls u niet kort geleden bent ingelogd, vragen wij u om uw wachtwoord opnieuw in te stellen.'
          },
          prompt: {
            title: 'Wachtwoord invoeren',
            message: 'Voer het wachtwoord in voor'
          },
          route: 'Inloggen',
          status: {
            401: 'Uw inloggegevens zijn niet juist.',
            default: () => `Welkom bij ${document.title}`,
            failure: {
              login: {
                confirm: 'De beveiligingscode is niet goed. Probeer opnieuw in te loggen.'
              }
            },
            success: {
              register: {
                request: 'U bent aangemeld. U kunt nu inloggen.'
              },
              reset: {
                confirm: 'Uw wachtwoord is gewijzigd. U kunt nu inloggen.'
              }
            }
          }
        },
        upgrade: {
          prompt: {
            title: 'Wachtwoord invoeren',
            message: 'Voer het wachtwoord in voor'
          }
        }
      }
    }
  }
})
