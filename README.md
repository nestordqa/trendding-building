lPRISMA COMMANDS:
prisma generate (Crea el client)
prisma studio (Abre una instancia en el navegador)
prisma db push (Pushea modelos a DB)
prisma migrate reset --force (Elimina db)


IMPLEMENTAR: RECAPTCHA, CALENDLY PARA AGENDAR CITAS

OJO: 
AGREGAR STUDENTS:
  Favoritos [Courses]
  Progreso curso
  Compañia
  Superpoder (Profesion)
  Puntos
  Payment[]
  SocialMedia[]
  Reviews:[]


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
  
AGREGAR A COURSES:
  Points: (Puntos de plataforma)
  Reviews[]
  Learn: string[] (Que aprenderás)
  Requires: string[] (Requerimientos)
  Target: String[]


CREAR MODELO LECCIONES: (Relacionar muchos a uno con curso)
  TITLE:
  DESCRIPTION:
  VIDEO:
  Puntuacion:
  Foto:
  Active:
  Test:[]
  Complete: boolean
  
 CREA MODELO TEST:
  Title:
  Description:
  Points:
  Answer:[]
  
 CREA MODELO EXERCISES:
  Answer:
  AnswerType: Boolean
  TestId
 
 
CREAR MODELO SOCIAL MEDIA:
  SocialMedia ENUM 
  Students[]
  
  
