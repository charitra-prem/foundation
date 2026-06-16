import { render } from '@testing-library/react-native';
import TipTapEditor from '../../components/TipTapEditor';

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: { testID?: string; source?: { html?: string } }) => (
      <View testID={props.testID ?? 'webview'} />
    ),
  };
});

describe('TipTapEditor', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<TipTapEditor />);
    expect(getByTestId('webview')).toBeTruthy();
  });

  it('accepts content prop', () => {
    const { getByTestId } = render(
      <TipTapEditor content="<p>Hello</p>" />,
    );
    expect(getByTestId('webview')).toBeTruthy();
  });

  it('accepts editable=false prop', () => {
    const { getByTestId } = render(<TipTapEditor editable={false} />);
    expect(getByTestId('webview')).toBeTruthy();
  });

  it('accepts onUpdate callback', () => {
    const onUpdate = jest.fn();
    const { getByTestId } = render(<TipTapEditor onUpdate={onUpdate} />);
    expect(getByTestId('webview')).toBeTruthy();
  });
});
