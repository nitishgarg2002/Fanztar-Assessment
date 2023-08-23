import Part from "../models/part.js";

const partsData = [new Part("A", 10.28, "LED Screen"),
  new Part("B", 24.07, "OLED Screen"), new Part("C", 33.30, "AMOLED Screen"),
  new Part("D", 25.94, "Wide-Angle Camera"),
  new Part("E", 32.39, "Ultra-Wide-Angle Camera"),
  new Part("F", 18.77, "USB-C Port"), new Part("G", 15.13, "Micro-USB Port"),
  new Part("H", 20.00, "Lightning Port"), new Part("I", 42.31, "Android OS"),
  new Part("J", 45.00, "iOS OS"), new Part("K", 45.00, "Metallic Body"),
  new Part("L", 30.00, "Plastic Body")

];

export const calculateTotalPrice = (selectedParts) => {

  return selectedParts.reduce((total, partCode) => {
    const selectedPart = partsData.find(part => part.code === partCode);
    if (selectedPart) {
      return total + selectedPart.price;
    }
    return total;
  }, 0);
}

export const arePartsValid = (selectedParts) => {
  const partsDataMap = partsData.reduce((map, part) => {
    map[part.code] = part;
    return map;
  }, {});

  const categoryCounts = {
    Screen: 0, Camera: 0, Port: 0, OS: 0, Body: 0
  };

  selectedParts.forEach((partCode) => {
    const selectedPart = partsDataMap[partCode];
    if (selectedPart) {
      Object.keys(categoryCounts).forEach((category) => {
        if (selectedPart.part.includes(category)) {
          categoryCounts[category]++;
        }
      });
    }
  });

  return Object.values(categoryCounts).every((count) => count === 1);
};

export const getParts = (selectedParts) => {

  const partsDataMap = partsData.reduce((map, part) => {
    map[part.code] = part;
    return map;
  }, {});

  return selectedParts.map((partCode) => {
    const selectedPart = partsDataMap[partCode];
    if (selectedPart) {
      return selectedPart.part;
    }
    return null;
  });

}

export const configureMobile = (req, res) => {
  const {components} = req.body;

  const selectedParts = components;
  console.log(selectedParts);

  if (selectedParts.length !== 5) {
    return res.status(400).json(
        {error: 'Invalid configuration. Please select exactly one part from each category.'});
  }

  if (!arePartsValid(selectedParts)) {
    return res.status(400).json(
        {error: 'Invalid configuration. Please select exactly one part from each category.'});
  }

  const totalPrice = calculateTotalPrice(selectedParts);

  const parts = getParts(selectedParts);
  return res.status(200).json(
      {orderId: Math.random() * 1000000, price: totalPrice, parts});
}

