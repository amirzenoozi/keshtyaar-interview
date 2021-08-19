import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { PopperMenu } from './menu-popper';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

Enzyme.configure({ adapter: new Adapter() });

describe('<PopperMenu />', () => {
  // Check Component Render Correctly
  it('Render PopperMenu Without Crashing', () => {
    shallow(
        <PopperMenu
          icon={MoreVertIcon}
          items={[
            {
              icon: FullscreenIcon,
              label: 'Fullscreen',
              clickHandler: () => {},
            },
          ]}
        />
    );
  });

  // Check Component Render Button
  it('Component Render Button', () => {
    const menu = mount(
        <PopperMenu
          icon={MoreVertIcon}
          items={[
            {
              icon: FullscreenIcon,
              label: 'Fullscreen',
              clickHandler: () => {},
            },
          ]}
        />
    );

    expect(menu.find('button')).toHaveLength(1);
  });
});
