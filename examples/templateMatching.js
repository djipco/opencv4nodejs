const cv = require('../');


const findWaldo = async () => {
  // Load images
  const originalMat = await cv.imreadAsync(`${__dirname}/templateMatching/original.jpg`);
  const waldoMat = await cv.imreadAsync(`${__dirname}/templateMatching/waldo.jpg`);

  // Match template (the brightest locations indicate the highest match)
  const matched = originalMat.matchTemplate(waldoMat, 5);

  // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
  const minMax = matched.minMaxLoc();
  const { maxLoc: { x, y } } = minMax;

  // Draw bounding rectangle
  originalMat.drawRectangle(
    new cv.Rect(x, y, waldoMat.cols, waldoMat.rows),
    new cv.Vec(0, 255, 0),
    2,
    cv.LINE_8
  );

  // Open result in new window
  cv.imshow('We\'ve found Waldo!', originalMat);
  cv.waitKey();
};

// noinspection JSIgnoredPromiseFromCall
findWaldo();
