package com.busfor.rnnappearance

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.res.Configuration
import android.os.Build
import androidx.appcompat.app.AppCompatDelegate
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import java.util.*

var themeResId: Int? = null

var onChangeCallback: ((mode: String) -> Void)? = null

class RNNAppearanceModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {
    private var lastEmittedMode: Int
    private var useSystemAppearance: Boolean

    private inner class Receiver(private val module: RNNAppearanceModule) : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            module.notifyForChange()
        }
    }

    private fun updateTheme() {
        themeResId?.let { currentActivity!!.setTheme(it) }
    }

    private fun emitCallback(appearance: String) {
        onChangeCallback?.let { it(appearance) }
    }

    private fun notifyForChange() {
        if (reactContext.hasActiveCatalystInstance()) {
            val currentMode = reactContext.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
            if (currentMode == lastEmittedMode) return
            lastEmittedMode = currentMode
            val mode = if (currentMode == Configuration.UI_MODE_NIGHT_YES) "dark" else "light"
            updateTheme()
            if (useSystemAppearance) {
                emitCallback(mode)
            }
            reactContext.getJSModule(RCTDeviceEventEmitter::class.java)
                    .emit("currentModeChanged", mode)
        }
    }

    @Suppress("unused")
    @ReactMethod
    fun setDefaultNightMode(mode: Int) {
        currentActivity?.runOnUiThread {
            AppCompatDelegate.setDefaultNightMode(mode)
            useSystemAppearance = mode == AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
            when (mode) {
                AppCompatDelegate.MODE_NIGHT_YES -> emitCallback("dark")
                AppCompatDelegate.MODE_NIGHT_NO -> emitCallback("light")
                AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM -> {
                    val currentSystemMode = reactContext.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
                    val systemAppearance = if (currentSystemMode == Configuration.UI_MODE_NIGHT_YES) "dark" else "light"
                    emitCallback(systemAppearance)
                }
            }
            updateTheme()
        }
    }

    override fun getName(): String {
        return "RNNAppearanceModule"
    }

    override fun getConstants(): Map<String, Any>? {
        val constants: MutableMap<String, Any> = HashMap()
        constants["DEVICE_BRAND"] = Build.BRAND
        constants["DARK_MODE_SUPPORTS"] = lastEmittedMode != Configuration.UI_MODE_NIGHT_UNDEFINED
        constants["MODE_NIGHT_NO"] = AppCompatDelegate.MODE_NIGHT_NO
        constants["MODE_NIGHT_YES"] = AppCompatDelegate.MODE_NIGHT_YES
        constants["MODE_NIGHT_FOLLOW_SYSTEM"] = AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
        return constants
    }

    override fun onHostResume() {
        notifyForChange()
    }

    override fun onHostPause() {}
    override fun onHostDestroy() {}

    init {
        lastEmittedMode = reactContext.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
        useSystemAppearance = false
        reactContext.addLifecycleEventListener(this)
        reactContext.registerReceiver(Receiver(this), IntentFilter("android.intent.action.CONFIGURATION_CHANGED"))
    }
}
