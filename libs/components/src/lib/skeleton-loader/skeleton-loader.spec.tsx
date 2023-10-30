import { render } from '@testing-library/react';

import SkeletonLoader from './skeleton-loader';

describe('SkeletonLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< SkeletonLoader />);
    expect(baseElement).toBeTruthy();
  });
});
