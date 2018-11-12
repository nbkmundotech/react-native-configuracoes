import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class Toggle extends React.Component {
  render() {
    const estiloDoNao = [styles.viewEscolha];
    if (this.props.value === false) {
      estiloDoNao.push(styles.viewNao);
    }

    const estiloDoSim = [styles.viewEscolha];
    if (this.props.value === true) {
      estiloDoSim.push(styles.viewSim);
    }

    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onToggle}>
        <View style={estiloDoNao}>
          <Text style={this.props.value === false ? styles.textoAtivo : undefined}>NÃO</Text>
        </View>
        <View style={estiloDoSim}>
          <Text style={this.props.value === true ? styles.textoAtivo : undefined}>SIM</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    borderWidth: 2,
    borderRadius: 6,
    flexDirection: 'row',
    borderWidth: 3
  },
  textoAtivo: {
    color: '#ffffff'
  },
  viewSim: {
    backgroundColor: '#00a000',
  },
  viewNao: {
    backgroundColor: '#ff0000'
  },
  viewEscolha: {
    alignItems: 'center',
    flex: 1,
    padding: 4
  }
});

export default Toggle;
