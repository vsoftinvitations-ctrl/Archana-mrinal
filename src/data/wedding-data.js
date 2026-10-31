/**
 * Wedding Digital Invitation Data Configuration (English Only)
 * Archana & Mrinal Wedding Invitation
 */

export const weddingData = {
  // Couple Information
  bride: {
    name: "Archana",
    shortName: "Archana",
    qualifications: "",
    image: "/assets/bride.jpg",
    bio: "Daughter of our beloved family, embarking on a sacred new chapter of life with grace and devotion.",
    parents: {
      father: "P R Sukumaran",
      mother: "Preethy Sukumaran",
      houseName: "",
      city: "Onakkoor"
    },
    siblingLabel: "",
    siblingsDisplay: "",
    siblings: []
  },
  groom: {
    name: "Mrinal",
    shortName: "Mrinal",
    qualifications: "",
    image: null,
    bio: "Son of our esteemed family, blessed to begin this divine voyage of love, harmony, and togetherness.",
    parents: {
      father: "Muraleemohan K V",
      mother: "Beena K V",
      houseName: "",
      city: ""
    },
    siblingLabel: "",
    siblingsDisplay: "",
    siblings: []
  },

  // Wedding Muhurtham & Event Details
  event: {
    muhurthamLabel: "Wedding Ceremony",
    dateDisplay: "Sunday, 13 December 2026",
    timeDisplay: "11:30 AM – 12:30 PM",
    muhurthamTimeWindow: "Muhurtham: 11:30 AM – 12:30 PM",
    venueName: "St Mary's Malankara Catholic Church Auditorium (Bethany Pally)",
    venueAddress: "Onakkoor",
    city: "Kerala",
    googleMapsUrl: "https://share.google/X7JdglsH0ByI6KfTz?utm_source=chatgpt.com",
    googleCalendarTitle: "Wedding of Archana & Mrinal",
    googleCalendarDescription: "You are cordially invited with family to celebrate the wedding of Archana & Mrinal at St Mary's Malankara Catholic Church Auditorium (Bethany Pally), Onakkoor, Kerala.",
    // Target ISO date for the live countdown timer (YYYY-MM-DDTHH:mm:ss)
    targetCountdownDate: "2026-12-13T11:30:00"
  },

  // RSVP Details (Accept & Decline Scenarios)
  rsvp: {
    whatsappNumber: "919778137459",
    acceptMessage: "Hello Archana & Mrinal, we are delighted to attend your wedding celebration!🎉🤍",
    declineMessage: "Hello Archana & Mrinal, we won't be able to attend your wedding celebration, but our heartfelt blessings and warm wishes are with you both!🤍✨"
  },

  // Sacred Ceremonies Timeline
  ceremonies: [
    {
      id: "ceremony-1",
      englishTitle: "Guest Welcome & Gathering",
      time: "10:30 AM",
      description: "Auspicious arrival of family and guests to celebrate the special occasion.",
      icon: "ring"
    },
    {
      id: "ceremony-2",
      englishTitle: "Wedding Ceremony (Muhurtham)",
      time: "11:30 AM – 12:30 PM",
      description: "Sacred wedding ceremony, exchanging of garlands and marital vows in the presence of loved ones.",
      icon: "lamp"
    },
    {
      id: "ceremony-3",
      englishTitle: "Traditional Wedding Feast",
      time: "01:00 PM onwards",
      description: "Delicious grand traditional feast served to celebrate the joyful union of Archana & Mrinal.",
      icon: "leaf"
    }
  ],

  // Couple Photo Gallery
  galleryImages: [
    {
      src: "/assets/couple.jpg",
      alt: "Archana & Mrinal",
      caption: "A journey of eternal companionship"
    },
    {
      src: "/assets/bride.jpg",
      alt: "Radiant Bride Archana",
      caption: "Radiant bride adorned in traditional Kerala Kasavu"
    },
    {
      src: "/assets/details.jpg",
      alt: "Sacred traditional wedding offerings",
      caption: "Sacred rituals & auspicious beginnings"
    }
  ],

  // Sacred Text & Blessings
  texts: {
    elderBlessingsEng: "With the blessings of our elders\nand the grace of the divine",
    twoHeartsEng: "Two hearts,\none beautiful beginning.",
    greetingEnglish: "With Warm Wishes & Blessings",
    coupleIntroHeading: "Together with our families",
    coupleIntroTagline: "Two souls, one journey, and a lifetime of beautiful moments.",
    weddingTogethernessQuote: "A wedding is the sacred union of two souls and the joyful coming together of two families—bound by love, cherished traditions, and the blessing of a lifetime of togetherness.",
    invitationHeading: "Cordially Inviting You",
    invitationSubtitleEng: "With joy in our hearts,\nwe invite you to celebrate our wedding.",
    familyHeading: "With the blessings of our families",
    countdownHeading: "Counting the moments...",
    locationHeading: "Join Us to Celebrate Our Wedding",
    finalBlessingEnglish: "Your presence and blessings\nwill make our beginning even more beautiful.",
    withLove: "With Love"
  }
};
