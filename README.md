lPRISMA COMMANDS:
prisma generate (Crea el client)
prisma studio (Abre una instancia en el navegador)
prisma db push (Pushea modelos a DB)
prisma migrate reset --force (Elimina db)


IMPLEMENTAR: RECAPTCHA

-Modelar============>
                    Dashboard students
                    Dashboard teachers
                    Dashboard Admins


OJO: 
AGREGAR STUDENTS:
  Favoritos [Courses]
  Progreso curso
  Compañia
  Superpoder (Profesion)
  Puntos
  Payment[]
  SocialMedia[]


CREAR MODELO TIPO DE CURSO: USERTYPE
  tipo: silver/gold/platinum
  price:
  Payment:[]
 

CREAR MODELO PAYMENT:
  ID
  Student id
  Price
  UserType@
  date
  method (binance, paypal, stripe)
  


CREAR MODELO LECCIONES: (Relacionar muchos a uno con curso)
  TITLE:
  DESCRIPTION:
  VIDEO:
  Puntuacion:
  Foto:
  Active:
  Test:[]
 
 
CREAR MODELO SOCIAL MEDIA:
  SocialMedia ENUM 
  Students[]
  
  
