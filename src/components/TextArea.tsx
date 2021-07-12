import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../util/Colors';

interface Props {
  onChange?: (text: string) => void;
  iconName?: string;
  keyboardType?: any;
  obscureText?: boolean;
  placeholder?: string;
  labelName?: string;
  color?: string;
  backgroundColor?: Colors;
  labelColor?: Colors;
  inputStyle?: TextStyle;
  editable?: boolean;
  autoFocus?: boolean;
  value?: string;
  containerStyle?: ViewStyle;
  height?: number;
}

const TextArea: React.FC<Props> = ({
  editable = true,
  autoFocus = false,
  ...props
}) => {
  return (
    <View style={[styles.container]}>
      {props.labelName && (
        <View>
          <Text
            style={
              props.color
                ? {...styles.labelStyle, color: props.color}
                : styles.labelStyle
            }>
            {props.labelName}
          </Text>
        </View>
      )}
      <ScrollView>
        <View
          style={
            props.backgroundColor
              ? [
                  {
                    ...styles.inputContainer,
                    backgroundColor: props.backgroundColor,
                    height: props.height,
                  },
                  props.containerStyle,
                ]
              : [
                  styles.inputContainer,
                  props.containerStyle,
                  {height: props.height},
                ]
          }>
          <View style={styles.inputWrapper}>
            {props.iconName && (
              <Icon
                name={props.iconName}
                size={20}
                color={props.color ? props.color : '#BDBDBD'}
              />
            )}
            <View style={{marginLeft: 8, flex: 1}}>
              <TextInput
                autoFocus={autoFocus}
                editable={editable}
                onChangeText={props.onChange}
                autoCapitalize="none"
                placeholder={props.placeholder ? props.placeholder : ''}
                keyboardType={
                  props.keyboardType ? props.keyboardType : 'default'
                }
                secureTextEntry={props.obscureText}
                value={props?.value}
                multiline={true}
                style={
                  props.color
                    ? {color: props.color, width: '100%', ...props.inputStyle}
                    : {color: '#000', width: '100%', ...props.inputStyle}
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 16,
  },
  inputContainer: {
    height: 200,
    backgroundColor: '#F2F2F2',
    borderColor: '#F2F2F2',
    borderWidth: 2,

    borderRadius: 4,
    marginBottom: 8,
    // justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  inputStyle: {
    marginLeft: 16,
    color: '#BDBDBD',
    fontFamily: 'SFUIText-Regular',
    fontSize: 16,
    flex: 1,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'SFUIText-Regular',
    color: Colors.GRAY_2,
    fontWeight: 'bold',
  },
});

export default TextArea;
