import * as Linking from "expo-linking"

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Lights: {
            screens: {
              LightsScreen: "one",
            },
          },
          Scenes: {
            screens: {
              ScenesScreen: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
}
