// components/GlobalState/index.tsx
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Fonts, FontWeights } from "../../constants/Fonts";
import { Spacing } from "../../constants/Spacing";

// Loading组件
export const GlobalLoading = () => {
  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator size="large" color={Colors.primaryBlue} />
      <Text style={styles.loadingText}>加载中...</Text>
    </View>
  );
};

// 空数据组件
interface EmptyDataProps {
  onRefresh: () => void;
}
export const EmptyData = ({ onRefresh }: EmptyDataProps) => {
  return (
    <View style={styles.stateWrapper}>
      <Text style={styles.emptyText}>暂无可用会议室数据</Text>
      <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
        <Text style={styles.refreshBtnText}>刷新重试</Text>
      </TouchableOpacity>
    </View>
  );
};

// 接口异常组件
interface ErrorStateProps {
  message?: string;
  onRefresh: () => void;
}
export const ErrorState = ({
  message = "接口请求失败，请检查网络",
  onRefresh,
}: ErrorStateProps) => {
  return (
    <View style={styles.stateWrapper}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
        <Text style={styles.refreshBtnText}>重新加载</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgDark,
  },
  loadingText: {
    color: Colors.white,
    fontSize: Fonts.content,
    marginTop: Spacing.md,
  },
  stateWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgDark,
    padding: Spacing.lg,
  },
  emptyText: {
    color: Colors.white,
    fontSize: Fonts.subTitle,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  errorText: {
    color: Colors.redActive,
    fontSize: Fonts.subTitle,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  refreshBtn: {
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 4,
  },
  refreshBtnText: {
    color: Colors.white,
    fontSize: Fonts.content,
    fontWeight: FontWeights.medium,
  },
});
