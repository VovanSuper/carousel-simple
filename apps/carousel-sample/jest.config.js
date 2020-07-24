module.exports = {
  name: 'carousel-sample',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/carousel-sample',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
