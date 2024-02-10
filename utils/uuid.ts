import rnUuid from "react-native-uuid";

export const uuid = () => {
  const uuidV4 = rnUuid.v4();
  if (Array.isArray(uuidV4)) {
    return uuidV4.join("-");
  }

  return uuidV4;
};
