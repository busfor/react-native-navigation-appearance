package com.example;

import android.os.Bundle;
import androidx.annotation.Nullable;
import com.reactnativenavigation.NavigationActivity;
import com.busfor.rnnappearance.RNNAppearanceModuleKt;

public class MainActivity extends NavigationActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        RNNAppearanceModuleKt.setThemeResId(R.style.AppTheme);
    }
    
}
