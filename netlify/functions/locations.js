exports.handler = async (event) => {
  const params = event.queryStringParameters;

  let locations = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.797086, 45.4902776],
      },
      properties: {
        city: 'portland',
        name: 'Yuzu',
        note: 'Izakaya that actually feels like eating in Japan. It’s hidden and tiny and you’ll think you’re in the wrong place when you pull up, but you’re exactly where you want to be.',
        url: 'https://www.google.com/maps/place/Yuzu/data=!4m2!3m1!1s0x54950ea7147444ed:0xcc19b100d05fa11f',
        slug: 'yuzu',
        address: '4130 SW 117th Ave H, Beaverton, OR 97005',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6756209, 45.5628509],
      },
      properties: {
        city: 'portland',
        name: 'Tulip Shop Tavern',
        note: 'smashburgers!',
        url: 'https://www.google.com/maps/place/Tulip+Shop+Tavern/data=!4m2!3m1!1s0x5495a7254d32cf4f:0xcf41808287338887',
        slug: 'tulip-shop-tavern',
        address: '825 N Killingsworth St, Portland, OR 97217',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6734935, 45.52040179999999],
      },
      properties: {
        city: 'portland',
        name: 'Tokyo Sando',
        note: 'Recommended by Katie',
        url: 'https://www.google.com/maps/place/Tokyo+Sando/data=!4m2!3m1!1s0x54950b3a9d6abfa9:0x309d4acaa41806bd',
        slug: 'tokyo-sando',
        address: '321 SW 2nd Ave, Portland, OR 97204',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.647105, 45.571772],
      },
      properties: {
        city: 'portland',
        name: 'Ranch PDX Woodlawn',
        note: 'Detroit-style (ish) pizza. I love the pepperoni pizza here — it\'s my favorite "I\'m going to eat whatever I want because I deserve it" meal.',
        url: 'https://www.google.com/maps/place/Ranch+PDX+Woodlawn/data=!4m2!3m1!1s0x54950a77133f975d:0x5f0e7a549b8dc484',
        slug: 'ranch-pdx-woodlawn',
        address: '1760 NE Dekum St, Portland, OR 97211',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.5786556, 45.5403528],
      },
      properties: {
        city: 'portland',
        name: 'Phở Oregon Restaurant',
        note: 'Great pho.',
        url: 'https://www.google.com/maps/place/Ph%E1%BB%9F+Oregon+Restaurant/data=!4m2!3m1!1s0x5495a14054926827:0x9288214314f95ffd',
        slug: 'ph-oregon-restaurant',
        address: '2518 NE 82nd Ave, Portland, OR 97220',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6192437, 45.5362509],
      },
      properties: {
        city: 'portland',
        name: 'The Bulgogi + Dukuhbee Noodle',
        note: 'Delicious noodles. Really good for lunch.',
        url: 'https://www.google.com/maps/place/The+Bulgogi+%2B+Dukuhbee+Noodle/data=!4m2!3m1!1s0x5495a0d77a73a479:0x60815de13802e059',
        slug: 'the-bulgogi-dukuhbee-noodle',
        address: '4232 NE Sandy Blvd, Portland, OR 97213',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.66, 45.5227778],
      },
      properties: {
        city: 'portland',
        name: 'Mirakutei Sushi & Ramen',
        note: 'They make a great tonkotsu ramen here. The lunchtime bento boxes are a sleeper hit. Sushi is pretty solid.',
        url: 'https://www.google.com/maps/place/Mirakutei/data=!4m2!3m1!1s0x5495a0af547ac9af:0x1c5363036a2b3027',
        slug: 'mirakutei',
        address: '536 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6313327, 45.5046312],
      },
      properties: {
        city: 'portland',
        name: 'Artigiano',
        note: 'The chef here is delightfully hipster and the food is top-notch. This is an amazing place to go eat outside on a sunny day.',
        url: 'https://www.google.com/maps/place/Artigiano/data=!4m2!3m1!1s0x5495a009e3476aef:0x1e2e8a5d0cd267fa',
        slug: 'artigiano',
        address: '3302 SE Division St, Portland, OR 97202',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6594928, 45.52233380000001],
      },
      properties: {
        city: 'portland',
        name: 'Kinboshi Ramen',
        note: 'Really good ramen.',
        url: 'https://www.google.com/maps/place/Marukin+Ramen/data=!4m2!3m1!1s0x5495a0a5fc223587:0xfe85344c3f4184e2',
        slug: 'marukin-ramen',
        address: '609 SE Ankeny St A, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6594107, 45.5223841],
      },
      properties: {
        city: 'portland',
        name: "Nong's Khao Man Gai",
        note: "The khao man gai is great, but my real favorite is the pork. It's just like what I've had in Thailand.",
        url: "https://www.google.com/maps/place/Nong's+Khao+Man+Gai/data=!4m2!3m1!1s0x54950a14395c5165:0x61784734ccf4187b",
        slug: 'nong-s-khao-man-gai',
        address: '609 SE Ankeny St C, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.634646, 45.56239799999999],
      },
      properties: {
        city: 'portland',
        name: 'Expatriate',
        note: 'If you could drink inside of a Decemberists song, this is what it would look like. Really good cocktails and bar food by one of the best chefs in Portland.',
        url: 'https://www.google.com/maps/place/Expatriate/data=!4m2!3m1!1s0x5495a6e77c59b2a9:0xe02445df0534e3e2',
        slug: 'expatriate',
        address: '5424 NE 30th Ave, Portland, OR 97211',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6488294, 45.56283879999999],
      },
      properties: {
        city: 'portland',
        name: 'Hat Yai',
        note: 'Excellent lunch spot. Get the combo.',
        url: 'https://www.google.com/maps/place/Hat+Yai/data=!4m2!3m1!1s0x5495a71e06362ce5:0x9bfdfe490f2413cc',
        slug: 'hat-yai',
        address: '1605 NE Killingsworth St, Portland, OR 97211',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6542683, 45.559278],
      },
      properties: {
        city: 'portland',
        name: 'Radio Room',
        note: 'Good brunch, dog-friendly patio.',
        url: 'https://www.google.com/maps/place/Radio+Room/data=!4m2!3m1!1s0x5495a7193b5d9715:0x6f10035cf4467eb8',
        slug: 'radio-room',
        address: '1101 NE Alberta St, Portland, OR 97211',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6343861, 45.5046167],
      },
      properties: {
        city: 'portland',
        name: 'Bollywood Theater',
        note: 'Get the paneer kati roll. And everything else on the menu.',
        url: 'https://www.google.com/maps/place/Bollywood+Theater/data=!4m2!3m1!1s0x5495a72002493db7:0x4f07059303e2bf5e',
        slug: 'bollywood-theater',
        address: '3010 SE Division St, Portland, OR 97202',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6495446, 45.5592288],
      },
      properties: {
        city: 'portland',
        name: 'Barista',
        note: 'Great coffee in a super hipster atmosphere.',
        url: 'https://www.google.com/maps/place/Barista/data=!4m2!3m1!1s0x5495a71f9bf5a069:0x87c819fad45cb9c6',
        slug: 'barista',
        address: '1725 NE Alberta St, Portland, OR 97211',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6415669, 45.559231],
      },
      properties: {
        city: 'portland',
        name: 'The Knock Back',
        note: 'Great cocktails and sliders.',
        url: 'https://www.google.com/maps/place/The+Knock+Back/data=!4m2!3m1!1s0x5495a6dfe8fa9769:0xebe41e0ee00894ff',
        slug: 'the-knock-back',
        address: '2315 NE Alberta St, Portland, OR 97211',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6375957, 45.5589355],
      },
      properties: {
        city: 'portland',
        name: 'Akasaru Ramen',
        note: 'Great ramen.',
        url: 'https://www.google.com/maps/place/Akasaru+Ramen/data=!4m2!3m1!1s0x5495a6de57240cb7:0x306b45e8ed523b',
        slug: 'akasaru-ramen',
        address: '2712 NE Alberta St, Portland, OR 97211',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.636933, 45.526625],
      },
      properties: {
        city: 'portland',
        name: 'Pambiche',
        note: "It's not Miami good, but it's pretty dang good.",
        url: 'https://www.google.com/maps/place/Pambiche/data=!4m2!3m1!1s0x5495a0c7654c4d17:0x69638f891245270a',
        slug: 'pambiche',
        address: '2811 NE Glisan St, Portland, OR 97232',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6320194, 45.5231778],
      },
      properties: {
        city: 'portland',
        name: 'Laurelhurst Market',
        note: 'Hit the butcher shop for lunch, or head over for dinner and get an amazing steak.',
        url: 'https://www.google.com/maps/place/Laurelhurst+Market/data=!4m2!3m1!1s0x5495a0c065b4baa5:0x9672d7ff9b7d23c8',
        slug: 'laurelhurst-market',
        address: '3155 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6561647, 45.5227548],
      },
      properties: {
        city: 'portland',
        name: 'Hey Love',
        note: 'Amazing bar with an amazing atmosphere.',
        url: 'https://www.google.com/maps/place/Hey+Love/data=!4m2!3m1!1s0x5495a1a13f300c6f:0x7b4b705505bcae7',
        slug: 'hey-love',
        address: '920 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6578134, 45.5227311],
      },
      properties: {
        city: 'portland',
        name: 'Le Pigeon',
        note: "If you want a ridiculous food experience, this is it. It'll cost a fair bit, but the coursed menu with wine pairings is legitimately one of the best food experiences around.",
        url: 'https://www.google.com/maps/place/Le+Pigeon/data=!4m2!3m1!1s0x5495a0a58c66fe9f:0x8b7b18904aca86f7',
        slug: 'le-pigeon',
        address: '738 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6580277, 45.52276029999999],
      },
      properties: {
        city: 'portland',
        name: 'Canard',
        note: 'Get the steam burgers. Everything is great here, though.',
        url: 'https://www.google.com/maps/place/Canard/data=!4m2!3m1!1s0x5495a0a58cc2d937:0x97f797d6b298bf9e',
        slug: 'canard',
        address: '734 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6328312, 45.5048916],
      },
      properties: {
        city: 'portland',
        name: 'Salt & Straw',
        note: 'Lives up to the hype. Taste everything, even if it sounds gross. Especially if it sounds gross, honestly.',
        url: 'https://www.google.com/maps/place/Salt+%26+Straw/data=!4m2!3m1!1s0x5495a08669385a71:0x4c79a98f24a49a4a',
        slug: 'salt-straw',
        address: '3345 SE Division St, Portland, OR 97202',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6297207, 45.5048855],
      },
      properties: {
        city: 'portland',
        name: "Ava Gene's",
        note: "You'll need a reservation. Excellent food and cocktails from one of the best chefs in Portland.",
        url: "https://www.google.com/maps/place/Ava+Gene's/data=!4m2!3m1!1s0x5495a08610e83751:0xb1602f2460d6dfb3",
        slug: 'ava-gene-s',
        address: '3377 SE Division St, Portland, OR 97202',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6555016, 45.50466],
      },
      properties: {
        city: 'portland',
        name: 'APEX',
        note: "Excellent outdoor space with a huge taplist. Cash-only, but there's an ATM in the building.",
        url: 'https://www.google.com/maps/place/APEX/data=!4m2!3m1!1s0x54950a77417c717b:0x7dbc1d5f87bd3906',
        slug: 'apex',
        address: '1216 SE Division St, Portland, OR 97202',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6583932008661, 45.51377758521889],
      },
      properties: {
        city: 'portland',
        name: 'Kokiyo Teriyaki',
        note: "Great for a fast lunch. Nothing fancy, but it's delicious.",
        url: 'https://www.google.com/maps/place/Kokiyo+Teriyaki/data=!4m2!3m1!1s0x54950a0a98c26b69:0x300782c4cac78d3',
        slug: 'kokiyo-teriyaki',
        address: '1234 SE 7th Ave, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6606018, 45.5135494],
      },
      properties: {
        city: 'portland',
        name: 'Coava Coffee Roasters',
        note: 'Best coffee in Portland in an amazing space.',
        url: 'https://www.google.com/maps/place/Coava+Coffee+Roasters/data=!4m2!3m1!1s0x54950a0ae93e6b79:0xc63aec4f3d1b3aad',
        slug: 'coava-coffee-roasters',
        address: '1300 SE Grand Ave a, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6590207, 45.5160199],
      },
      properties: {
        city: 'portland',
        name: 'Afuri Izakaya',
        note: "Great izakaya. Skip the ramen though; it's not great.",
        url: 'https://www.google.com/maps/place/AFURI+IZAKAYA/data=!4m2!3m1!1s0x5495a0a094b89733:0x5f6c350793c662f5',
        slug: 'afuri-izakaya',
        address: '923 SE 7th Ave, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6579674, 45.5188801],
      },
      properties: {
        city: 'portland',
        name: 'Taqueria Nueve',
        note: "Kinda fancy for tacos, but they're solid. Head here after Rum Club.",
        url: 'https://www.google.com/maps/place/Taqueria+Nueve/data=!4m2!3m1!1s0x5495a0a6c6cf74eb:0xc168ed50db55ee7b',
        slug: 'taqueria-nueve',
        address: '727 SE Washington St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6578598, 45.5190429],
      },
      properties: {
        city: 'portland',
        name: 'Rum Club',
        note: "One of Portland's best-kept bar secrets. Try the punch.",
        url: 'https://www.google.com/maps/place/Rum+Club/data=!4m2!3m1!1s0x5495a0a6c6ae3aaf:0xf275c018824dd34d',
        slug: 'rum-club',
        address: '720 SE Sandy Blvd, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6453848, 45.5230255],
      },
      properties: {
        city: 'portland',
        name: 'Heart Coffee',
        note: 'One of my favorite coffee roasters.',
        url: 'https://www.google.com/maps/place/Heart+Coffee+Roasters/data=!4m2!3m1!1s0x5495a0bbf9a65e65:0x8f8ec0cd8726c3d2',
        slug: 'heart-coffee-roasters',
        address: '2211 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6438554, 45.5230833],
      },
      properties: {
        city: 'portland',
        name: 'Screen Door',
        note: "Super famous brunch. Worth it, but show up a half-hour before they open if you don't want to wait 2+ hours.",
        url: 'https://www.google.com/maps/place/Screen+Door/data=!4m2!3m1!1s0x5495a0beac1053bb:0x8606af39a198e136',
        slug: 'screen-door',
        address: '2337 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6404936, 45.52263689999999],
      },
      properties: {
        city: 'portland',
        name: 'Tusk',
        note: "Do the tasting menu. You'll leave extremely full and happy.",
        url: 'https://www.google.com/maps/place/Tusk/data=!4m2!3m1!1s0x5495a0bebbbcc27d:0x3def7f68b0306cac',
        slug: 'tusk',
        address: '2448 E Burnside St, Portland, OR 97214',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.637125, 45.523214],
      },
      properties: {
        city: 'portland',
        name: 'Angel Face',
        note: 'Leah Brown is one of the best bartenders around. No menu; just describe what flavors you like.',
        url: 'https://www.google.com/maps/place/Angel+Face/data=!4m2!3m1!1s0x5495a0bf184a4e63:0x7308f145d2d4cd0b',
        slug: 'angel-face',
        address: '14 NE 28th Ave, Portland, OR 97232',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6371249, 45.5227417],
      },
      properties: {
        city: 'portland',
        name: 'Paadee',
        note: 'Get the crab fried rice!',
        url: 'https://www.google.com/maps/place/PaaDee/data=!4m2!3m1!1s0x5495a0bf1c1350c3:0xa6095d8df3b537ea',
        slug: 'paadee',
        address: '6 SE 28th Ave, Portland, OR 97214',
      },
    },
  ]
    .map((l, index) => ({ ...l, id: index }))
    .sort((a, b) => a.properties.name.localeCompare(b.properties.name));

  if (params?.city) {
    locations = locations.filter((l) => l.properties.city === params.city);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(locations),
  };
};
