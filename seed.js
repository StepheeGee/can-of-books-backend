'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_KEY);

const Book = require('./books.js');

async function seed() {

  await Book.create({
    title: 'Burn the Boats',
    description: 'Burn the Boats is the manifesto for anyone looking to level up their life while navigating risk.',
    status: true,
  });

  console.log('Book 1 was created');

  await Book.create({
    title: 'Self-Compassion: The Proven Power of Being Kind to Yourself',
    description: 'Self-Compassion: Stop Beating Yourself Up and Leave Insecurity Behind offers expert advice on how to limit self-criticism and offset its negative effects, enabling you to achieve your highest potential and a more contented, fulfilled life.',
    status: true,
  });

  console.log('Book 2 was created');

  await Book.create({
    title: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
    description: 'Dr. Bessel van der Kolk, one of the world\’s foremost experts on trauma, has spent over three decades working with survivors. In The Body Keeps the Score, he uses recent scientific advances to show how trauma literally reshapes both body and brain, compromising sufferers\’ capacities for pleasure, engagement, self-control, and trust.',
    status: false,
  });

  console.log('Book 3 was created');

  mongoose.disconnect();

}

module.exports = seed;