module.exports = {
  name: 'carousel-simple',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/carousel-simple',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
