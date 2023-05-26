import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import Reports from "./Reports";
import TaskHistory from "./TaskHistory";
import ActiveTask from "./ActiveTask";
import OffersRequests from "./OffersRequests";
import Rating from "./Ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = (props) => {
  const navigation = useNavigation();
  const [
    offerCount, setOfferCount] = useState(0);
  const id = props.route.params.id;
  useEffect(() => {
    console.log(id, "fucn");
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log("Failed to remove token from AsyncStorage:", error);
    }
    navigation.navigate("SignIn");
  };

  const handleOfferCountChange = (count) => {
    setOfferCount(count);
  };
  // dashboard presk qryb tekml , mazel kn design
  // mahabich ypushi
  const navigateToProfile = () => {
    navigation.navigate("WorkerProfil", { id: id });
  };
  const navigateToInbox = () => {
    navigation.navigate("Inbox", { workersId: id });
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.subContainer}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        ></TouchableOpacity>
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.exit} onPress={handleLogout}>
            <Text style={styles.buttontext}> log out</Text>
          </TouchableOpacity>
          <Image
            source={require("../../../../assets/logout.png")}
            style={styles.logout}
            onPress={handleLogout}
          />
          <TouchableOpacity
            onPress={navigateToProfile}
            style={styles.buttonProfile}
          >
            <Text style={styles.buttontext}>Profile</Text>
          </TouchableOpacity>
          <Image
            source={require("../../../../assets/profile.png")}
            style={styles.profile}
            onPress={handleLogout}
          />
          <TouchableOpacity onPress={navigateToInbox}>
            <Text style={styles.buttontext}>Inbox</Text>
          </TouchableOpacity>
          <Image
            source={require("../../../../assets/inbox.png")}
            style={styles.inbox}
            onPress={handleLogout}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.line2} />
        <View style={styles.line3} />
        <View style={styles.container}>
          <View style={styles.topThreeContainer}>
            <TouchableOpacity
              style={[styles.activeTask, styles.border]}
              onPress={() => navigation.navigate("ActiveTask")}
            >
              <Text>Active Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.lastTask, styles.border]}
              onPress={() => console.log("messi")}
            >
              <Text>Last Task Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.offerRequests, styles.border]}
              onPress={() => navigation.navigate("OfferScreen", { id: id })}
            >
              <Text>Offers Requests</Text>
             
            </TouchableOpacity>
            <OffersRequests onCountChange={handleOfferCountChange} />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[styles.reports, styles.border]}
              onPress={() => navigation.navigate('ReportScreen',{id:id})}
            >
              <Text>Reports</Text>
            </TouchableOpacity>
            <View style={styles.bottomRightContainer}>
              <TouchableOpacity
                style={[styles.history, styles.border]}
                onPress={() => navigation.navigate('HistoryScreen',{id:id})}
              >
                <Text>Show History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Dashboard;
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    borderColor: "#036BB9",
    borderWidth: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  buttonProfile: {
    right: "120%",
  },
  profile: {
    right: "110%",
    top: "-1%",
  },
  backk: {
    position: "absolute",
    width: "12%",
    height: "5%",
  },
  inbox: {
    width: 22,
    height: 22,
    right: -7,
  },
  exit: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 8,
    maxHeight: "120%",
  },
  backButton: {
    width: "10%",
    position: "absolute",
  },

  back: {
    width: 40,
    left: 60,
    top: -30,
  },
  logout: {
    right: 106,
  },
  line: {
    width: "30%",
    height: 2,
    backgroundColor: "black",
    top: "91.5%",
  },
  line2: {
    width: "30%",
    height: 2,
    backgroundColor: "black",
    top: "91.1%",
    left: "40.5%",
  },
  line3: {
    width: "20%",
    height: 2,
    backgroundColor: "black",
    top: "90.80%",
    left: "78.5%",
  },
  buttontext: {
    fontWeight: "bold",
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    top: "204%",
  },
  logo: {
    position: "absolute",
    width: "18%",
    height: "10%",
    left: "80%",
    top: "-3%",
  },
  container: {
    paddingTop: 0,
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
  },

  topThreeContainer: {
    marginVertical: 16,
    flex: 1,
    justifyContent: "flex-start",
  },

  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    maxHeight: "102%",
  },
  bottomRightContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 8,
  },
  activeTask: {
    flex: 2,
    backgroundColor: "#D3EFD2",
    alignSelf: "stretch",
    marginBottom: 16,
    borderRadius: 8,
  },
  lastTask: {
    flex: 1,
    backgroundColor: "#F0F4E3",
    alignSelf: "stretch",
    marginBottom: 16,
    borderRadius: 8,
  },
  offerRequests: {
    flex: 2,
    backgroundColor: "#E3EEF4",
    alignSelf: "stretch",
    borderRadius: 8,
  },
  reports: {
    borderRadius: 8,
    marginRight: 16,
    flex: 1,
    backgroundColor: "#EFBCBC",
    maxHeight: "90%",
  },
  availability: {
    borderRadius: 8,
    backgroundColor: "#E3D2A6",
    width: "100%",
    height: 100,
    flex: 1,
    marginBottom: 16,
  },
  ratings: {
    flex: 2,
    backgroundColor: "#E3EEF4",
    alignSelf: "stretch",
    marginBottom: 16,
    borderRadius: 8,
  },
  history: {
    flex: 1,
    backgroundColor: "#E3D2A6",
    alignSelf: "stretch",
    borderRadius: 8,
    maxHeight: "90%",
    width: "102%",
  },
});
