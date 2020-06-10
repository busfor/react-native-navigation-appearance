# react-native-navigation-appearance

![npm](https://img.shields.io/npm/dw/@busfor/react-native-navigation-appearance?style=for-the-badge)
[![npm (tag)](https://img.shields.io/npm/v/@busfor/react-native-navigation-appearance/latest?style=for-the-badge)](https://www.npmjs.com/package/@busfor/react-native-navigation-appearance)
![](https://img.shields.io/npm/types/typescript?style=for-the-badge)

React Native universal Touchable component.

<div>
<img width="280px" src="example.gif" />
<img width="280px" src="realcase.gif" />
</div>

---

## Installation

### Android

#### 1 Install module

`$ yarn add @busfor/react-native-navigation-appearance`

#### 2 Update `MainActivity.java`

This file is located in `android/app/src/main/java/com/<yourproject>/MainActivity.java`.

```diff
+import android.os.Bundle;
+import androidx.annotation.Nullable;
+import com.busfor.rnnappearance.RNNAppearanceModuleKt;

public class MainActivity extends NavigationActivity {
+  @Override
+  protected void onCreate(@Nullable Bundle savedInstanceState) {
+    super.onCreate(savedInstanceState);
+    RNNAppearanceModuleKt.setThemeResId(R.style.AppTheme);
+  }
}
```

#### 3 Configure android styles.xml

This file is located in `android/app/src/main/res/values/styles.xml`.

```diff
<resources>
+
+    <style name="Theme.AppCompat.DayNight" parent="Theme.AppCompat.Light" />

    <!-- Base application theme. -->
-    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
+    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:textColor">#000000</item>
    </style>

</resources>
```

#### 4 Create android night styles.xml

This file should be located in `android/app/src/main/res/values-night/styles.xml`.

```xml
<resources>

    <style name="Theme.AppCompat.DayNight" parent="Theme.AppCompat" />

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:textColor">#FFFFFF</item>
    </style>

</resources>
```

### IOS

Make sure you don't have `UIUserInterfaceStyle` in `Info.plist`

## Usage

WIP
