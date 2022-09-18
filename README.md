# Sprendžiamo uždavinio aprašymas
## Sistemos paskirtis
Projekto tikslas – suteikti siuntų pristatymo įmonei galimybę kontroliuoti siuntas bei užtikrinti sklandų siuntų pristatymą.

Administratorius galės pridėti įmonės automobilius prie sistemos ir siuntas, kurios laukia pristatymo. Tuomet administratorius galės sukurti kurjeriui paskyrą prie sistemos, priskirti kurjeriui automobilį, bei siuntas, kurias reikia pristatyti. Kurjeris galės matyti kurį automobilį jam priskyrę, siuntų maršrutą ir keisti siuntos pristatymo statusą. Neregistruotas sistemos naudotojas turės galimybę peržiūrėti siuntos statusą.

Taikomosios sirties objektai: siunta <- kurjeris <- automobilis.

## Funkciniai reikalavimai
Neregistruotas sistemos naudotojas galės:
1. Prisijungti prie internetinės aplikacijos;
2. Peržiūrėti siuntos būseną.

Registruotas sistemos naudotojas (kurjeris) galės:
1. Matyti priskirto automobilio informaciją;
2. Matyti savo pristatomų siuntų sąrašą;
3. Matyti detalią pristatomos siuntos informaciją;
4. Atnaujinti siuntos statusą.

Administratorius galės:
1. Valdyti kurjerius (CRUD);
2. Valdyti siuntas (CRUD);
3. Valdyti automobilius (CRUD);
4. Priskirti kurjerį prie siuntos;
5. Priskirti automobilį prie kurjerio.

# Sistemos architektūra
Sistemos sudedamosios dalys:
- Kliento pusė (ang. Front-End) – naudojant React.js;
- Serverio pusė (angl. Back-End) – naudojant Node.js. Duomenų bazė – MySQL.

![](/deployment-diagram.png)
