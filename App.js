import React from 'react';
import {
  ActivityIndicator,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Constants from 'expo-constants';

import Toggle from './components/Toggle';
import { carregarConfiguracao, salvarConfiguracao } from './storage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      receberNotificacoes: true,
      tema: 'rosa',
      carregando: true
    };

    this.onReceberNotificacoesToggle = this.onReceberNotificacoesToggle.bind(this);
    this.onTemaChange = this.onTemaChange.bind(this);
  }

  componentDidMount() {
    // setTimeout(() => {
      // Promise.all([
      //   carregarConfiguracao('receberNotificacoes'),
      //   carregarConfiguracao('tema')
      // ]).then(valores => {
      //   const state = { carregando: false };
      //
      //   if (valores[0] !== null) {
      //     state.receberNotificacoes = valores[0] === 'true';
      //   }
      //   if (valores[1] !== null) {
      //     state.tema = valores[1];
      //   }
      //
      //   this.setState(state);
      // })

      carregarConfiguracao('configuracoes')
        .then(configuracao => {
          if (configuracao !== null) {
            const objetoDeValores = JSON.parse(configuracao);
            const state = { carregando: false };

            if (objetoDeValores.receberNotificacoes != null) {
              state.receberNotificacoes = objetoDeValores.receberNotificacoes;
            }

            if (objetoDeValores.tema != null) {
              state.tema = objetoDeValores.tema;
            }

            this.setState(state);
          } else {
            this.setState({ carregando: false });
          }
        });

    // }, 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.receberNotificacoes !== this.state.receberNotificacoes) {
    //   // salvar a nova configuracao no async storage
    //   salvarConfiguracao('receberNotificacoes', this.state.receberNotificacoes.toString());
    // }
    //
    // if (prevState.tema !== this.state.tema) {
    //   salvarConfiguracao('tema', this.state.tema);
    // }

    if (prevState.receberNotificacoes !== this.state.receberNotificacoes || prevState.tema !== this.state.tema) {
      const novaConfiguracao = {
        receberNotificacoes: this.state.receberNotificacoes,
        tema: this.state.tema
      };
      salvarConfiguracao('configuracoes', JSON.stringify(novaConfiguracao));
    }
  }

  onReceberNotificacoesToggle() {
    this.setState({
      receberNotificacoes: !this.state.receberNotificacoes
    })
  }

  onTemaChange(value) {
    this.setState({
      tema: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.linha}>
          <Text style={{ flex: 3, fontSize: 20 }}>Receber notificações</Text>
          <Toggle
            style={{ flex: 1 }}
            value={this.state.receberNotificacoes}
            onToggle={this.onReceberNotificacoesToggle}
          />
        </View>

        <View style={{ marginTop: 16, paddingLeft: 16 }}>
          <Text style={{ fontSize: 20 }}>Tema:</Text>
          <View style={{ alignItems: 'center' }}>
            <Picker style={{ width: 120 }} selectedValue={this.state.tema} onValueChange={this.onTemaChange}>
              <Picker.Item label="Azul" value="azul" />
              <Picker.Item label="Rosa" value="rosa" />
              <Picker.Item label="Verde" value="verde" />
            </Picker>
          </View>
        </View>

        {this.state.carregando && <ActivityIndicator style={styles.activityIndicator} size="large" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // right: 0,
    // bottom: 0
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  }
});

export default App;
