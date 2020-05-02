require('dotenv').config()
const faker = require('faker/locale/en_US')
const _ = require('lodash')

let user_id = 1000
const KINESIS_STREAM = process.env.KINESIS_DATA_STREAM

function generateUser(user_id) {
  const user = faker.helpers.createCard()

  user.user_id = user_id
  user.password = faker.internet.password()
  user.ssn = faker.phone.phoneNumberFormat()
  user.ssn = user.ssn.slice(0, 4) + user.ssn.slice(5)
  user.last_visit = faker.date.past()
  user.last_updated = faker.date.recent()
  user.title = faker.name.title()
  user.job_title = faker.name.jobTitle()
  user.job_area = faker.name.jobArea()
  user.job_type = faker.name.jobType()
  user.lat = faker.address.latitude()
  user.long = faker.address.longitude()
  user.zip = faker.address.zipCode().slice(0, 5)
  user.state = faker.address.state()
  user.created_at = new Date()

  delete user.posts
  delete user.accountHistory

  return user
}

async function insert(){
  try {
      while(true) {
        const user = generateUser(user_id)
        console.log(`inserted user: ${user.username}`)
        console.log(user)
        user_id++
      }
  } catch (err) {
    console.log('insert error ', err)
  }
}

insert()
