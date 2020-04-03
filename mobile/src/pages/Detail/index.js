import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Share
} from "react-native";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = ` Olá ${
    incident.name
  } , estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" no valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)}`;

  function navigationBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Vejo em você tem um espirito heroico ajude no caso "${
          incident.title
        }" no valor de ${Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(
          incident.value
        )}, a sua ajuda pode fazer a diferença, entre em contato com ${
          incident.whatsapp
        } `
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigationBack}>
          <Feather name="arrow-left" size={28} color="#e82041"></Feather>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>
      <View style={styles.contactBox}>
        <View style={styles.share}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <TouchableOpacity onPress={onShare}>
            <Feather name="share-2" size={28} color="#e82041"></Feather>
          </TouchableOpacity>
        </View>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em Contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
