import * as React from 'react';
import { Text as DefaultText, View as DefaultView, Linking} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Hyperlink from 'react-native-hyperlink';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

// リンクを開くためのコンポーネント
export function Link({url}) {
  return (
    <View>
      <Hyperlink
        linkStyle={{color: '#2980b9', fontWeight: 'bold'}}
        onPress={(url: string, text: string) => {
          Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('無効なURLです: ' + url);
            } else {
              return Linking.openURL(url);
            }
          }).catch(err => console.error('URLを開けませんでした。', err));
        }}>
        <Text>
          {url}
        </Text>
      </Hyperlink>
    </View>
    );
}