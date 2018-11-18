using System.Linq;

namespace Getflix.Models
{
    // Seeder databasen med henvendelser, de fleste med svar, men også en som ikke er besvart enda
    public class DBSeeder
    {
        public static void Seed(FaqContext context)
        {
            if (!context.Henvendelser.Any())
            {
                context.AddRange
                (
                    new Faq
                    {
                        navn = "Hans",
                        omrode = "Teknisk",
                        melding = "Går ikke å trykke 'last ned'.",
                        svar = "Hei Hans! Dette er et kjent problem i det siste! Det som kan hjelpe er å logge seg ut og inn av applikasjonen. Om dette derimot ikke skulle løse problemet kan det hende at kortinformasjonen ikke er korrekt, da anbefaler jeg å dobbeltsjekke denne. Håper dette var oppklarende! Mvh Kristian i Getflix.",
                        rating = 133
                    },
                    new Faq
                    {
                        navn = "Ole",
                        omrode = "Teknisk",
                        melding = "Hei. Jeg får ikke logget inn. Kan dere hjelpe meg?",
                        svar = "Hei Ole! Om du sliter med å logge inn, ville jeg prøvd å skaffet meg et nytt passord, dette gjør du ved å trykke på 'Glemt passord' ved innloggingen, deretter følger du bare trinnene så skal du få et nytt passord. Om dette ikke hjelper, ta direkte kontakt med oss! Mvh Grethe i Getflix.",
                        rating = 32
                    },
                    new Faq
                    {
                        navn = "PK",
                        omrode = "Teknisk",
                        melding = "Hei. Jeg sliter med å registrere en bruker, jeg skjønner ikke helt hvorfor jeg ikke får registrert meg, jeg fyller inn alt som skal gjøres, men så får jeg beskjed om at eposten min allerede er brukt?? Hva kan være grunnen til dette? Setter pris på svar.",
                        svar = "",
                        rating = 1
                    },
                    new Faq
                    {
                        navn = "Anonym",
                        omrode = "Teknisk",
                        melding = "Hei! Jeg har vært kunde av dere i mange måneder nå, men fortsatt så sliter jeg med at det tar lang tid å laste ned. Altså det kan da ikke ta over en time bare laste ned en film vel?? Hvorfor i alle dager kan dere ikke fikse dette??",
                        svar = "Hei Anonym! Filmer kan dessverre være ganske store filer og kan ta litt tid å laste ned, men som oftest ikke så mye som en time. Om du sliter med nedlastningshastighet er nok dette en følge av internetthastigheten din. Da ville jeg først og fremst sjekket om du kunne sette ruteren lenger vekk fra teknologi da dette kan ødelegge for signalet. Eller så ville jeg ha kontaktet internettleveranderen din.\nHåper dette var oppklarende. Mvh Kristian i Getflix.",
                        rating = -35
                    },
                    new Faq
                    {
                        navn = "Per",
                        omrode = "Betaling",
                        melding = "Hei! Hva koster det å kjøpe filmer fra dere?",
                        svar = "Hei Per! Prisen på filmer hos oss varierer fra film til film og kommer an på hvor nye de er og kvaliteten. For de nyeste filmene (blant annet for Black Panther) i Blu Ray ligger prisen som oftest på 149,- Mens for eldre filmer kan prisen være nede i 50,- og på tilbud (vi skal ha juletilbud snart) ligger prisen ofte nede på 20,- :-).Mvh Grethe i Getflix.",
                        rating = 13
                    },
                    new Faq
                    {
                        navn = "Jon Griske",
                        omrode = "Betaling",
                        melding = "Halla! Hvorfor skulle jeg egentlig gidde å betale 150 spenn for én film når jeg bare betale 100 kroner for å se en haug med filmer hos HDO?? Teit!",
                        svar="Hei Jon! Om du vil være kunde hos oss eller ikke er jo selvfølgelig helt opp til deg. Grunnen til at mange velger oss over strømmetjenester som HCO er gjerne fordi vi ikke tar noen faste betalinger fra kundene våre, hos oss betaler du bare en lav engangspris for en film og så har du den filmen for alltid! Da slipper du å betale 100,- i måneden for å bare se de samme filmene om og om igjen. Dessuten har vi et veldig bredt sortiment av filmer og har de aller fleste nye filmene tilgjengelig. Mvh Kristian i Getflix.",
                        rating = 2
                    },
                    new Faq
                    {
                        navn = "BM",
                        omrode = "Annet",
                        melding = "Hei! Går det an å se på filmer uten nett?? Hadde vært megachill om det var mulig!",
                        svar = "Hei BM! Det er fullt mulig! Har du lastet en film allerede så kan du selvfølgelig se på dem uten nett! :-) Da kan du se på dem på hytta eller flyet eller hvor du nå enn skulle være! Mvh Kristian i Getflix.",
                        rating = 52
                    },
                    new Faq
                    {
                        navn = "Trine",
                        omrode = "Annet",
                        melding = "Hei! Kommer dere til å legge til flere julefilmer snart. Skal ha julebord i starten av Desember og hadde vært magekoz med love actually i bakgrunnen da <3 Klem fra Trine! PS: elsker Getflix forresten! Kan ikke leve uten!",
                        svar = "Hei trine! Så koselig at du liker applikasjonen vår! Vi har store planer om å utvide julesortimentet vårt i løpet av de kommende ukene! Kan ikke gå inn i nøyaktig hvilke titler som blir lagt til helt enda, men du kan følge oss på sosiale medier for å få vite det med en gang det er offisielt (hvilket skulle bli i løpet av neste uke)! Mvh Kristian i Getflix",
                        rating = 42
                    },
                    new Faq
                    {
                        navn = "Gunn",
                        omrode = "Annet",
                        melding = "Hei! Hvordan kan jeg se filmene jeg allerede har lastet ned, beklager om det er et dumt spørsmål, jeg er ikke så teknisk anlagt av meg. Hilsen Gunn.",
                        svar = "Hei Gunn! Nå har det vel seg sånn at det ikke finnes noen dumme spørsmål vel! Filmene du har kjøpt kan sees om du trykker på 'Min bruker' oppe i høyre hjørne og deretter 'Mine Filmer' Her kan du velge hvilke filmer du vil laste ned eller om du har lastet dem ned alt, kan du velge om du vil se dem. Håper dette var oppklarende. Mvh Gunn i Getflix.",
                        rating = 4
                    }
                );
            }
            context.SaveChanges();
        }
    }
}
