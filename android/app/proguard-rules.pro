# Regras gerais para React Native e o motor Hermes
-keep public class com.facebook.react.ReactApplication
-keep public class com.facebook.react.MainApplication
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Manter classes do OkHttp/Okio, usadas para networking, o que pode previnir erros de conexão
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-keep class okio.** { *; }
-keep interface okio.** { *; }

# Regras para react-native-svg (Vimos o erro "com.horcrux.svg" nos seus logs)
-keep public class com.horcrux.svg.** { *; }

# Regras para react-native-gesture-handler (Vimos o erro "com.swmansion.gesturehandler" nos seus logs)
-keep public class com.swmansion.gesturehandler.react.** { *; }

# Regras para react-native-reanimated (É uma boa prática incluir, pois ele também faz muito trabalho nativo)
-keep class com.swmansion.reanimated.** { *; }

# Regras gerais para evitar que métodos de Views customizadas sejam removidos
-keep public class * extends android.view.View {
    public <init>(android.content.Context);
    public <init>(android.content.Context, android.util.AttributeSet);
    public <init>(android.content.Context, android.util.AttributeSet, int);
    public void set*(...);
}