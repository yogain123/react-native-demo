import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { getSingleDeals } from "./api";
import { CheckBox } from "react-native-elements";

function Profile(props) {
  const { key } = props.route.params;
  const [deal, setDeal] = useState({});
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    const fetchSingleDeals = async () => {
      const data = await getSingleDeals(key);
      setDeal(data);
    };
    fetchSingleDeals();
  }, []);
  return Object.keys(deal).length ? (
    <View>
      <View>
        <Image
          style={{ width: "100%", height: 150 }}
          source={{ uri: deal.media[0] }}
        />
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{deal.title}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{deal.cause.name}</Text>
            <Text style={{ fontWeight: "bold" }}>{deal.price + "Rs"}</Text>
          </View>
        </View>
      </View>
      <CheckBox
        center
        checked={checked}
        checkedColor="#0F0"
        checkedTitle="Great!"
        containerStyle={{ width: "75%" }}
        onIconPress={() => setChecked(!checked)}
        onLongIconPress={() => console.log("onLongIconPress()")}
        onLongPress={() => console.log("onLongPress()")}
        onPress={() => console.log("onPress()")}
        size={30}
        textStyle={{}}
        title="Check for Awesomeness"
        titleProps={{}}
        uncheckedColor="#F00"
      />
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}

export default Profile;
