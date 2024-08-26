import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;

import java.io.File;

public class MyApp extends Application {

    private Stage primaryStage;
    private WebView webView;
    private WebEngine webEngine;
    private Control control; // Instance of Control

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        control = new Control(); // Initialize Control instance
        control.startPeriodicTask();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutting down...");
            if (control != null) {
                control.stopPeriodicTask();
            }
        }));

        webView = new WebView();
        webEngine = webView.getEngine();

        loadLoginPage();

        BorderPane root = new BorderPane();
        root.setCenter(webView);
        Scene scene = new Scene(root, 1300, 600); // Preferred size for laptops

        primaryStage.setMinWidth(800);
        primaryStage.setMinHeight(600);

        primaryStage.widthProperty().addListener((obs, oldVal, newVal) -> {
            webView.prefWidthProperty().bind(primaryStage.widthProperty().multiply(0.9)); // Adjust width
            if (newVal.doubleValue() < 800) {
                webView.setZoom(0.9); // Zoom out on smaller screens
            } else if (newVal.doubleValue() > 1600) {
                webView.setZoom(1.1); // Zoom in on larger screens
            } else {
                webView.setZoom(1.0); // Default zoom
            }
        });

        primaryStage.heightProperty().addListener((obs, oldVal, newVal) -> {
            webView.prefHeightProperty().bind(primaryStage.heightProperty().multiply(0.9)); // Adjust height
        });

        primaryStage.setTitle("SNMP Application");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @Override
    public void stop() {
        if (control != null) {
            control.stopPeriodicTask();
        }
    }

    public void loadLoginPage() {
        String filePath = new File("resources/login.html").toURI().toString();
        webEngine.load(filePath);

        webEngine.getLoadWorker().stateProperty().addListener((obs, oldState, newState) -> {
            if (newState.toString().equals("SUCCEEDED")) {
                JSObject window = (JSObject) webEngine.executeScript("window");
                window.setMember("javaObject", new JavaBridge(this));
            }
        });
    }

    public void loadMonitorPage(String resultText) {
        Platform.runLater(() -> {
            String filePath = new File("resources/monitor.html").toURI().toString();
            webEngine.load(filePath);

            webEngine.getLoadWorker().stateProperty().addListener((obs, oldState, newState) -> {
                if (newState.toString().equals("SUCCEEDED")) {
                    JSObject window = (JSObject) webEngine.executeScript("window");
                    window.setMember("javaObject", new JavaBridge(this));
                    String escapedResultText = escapeJavaScript(resultText);
                    webEngine.executeScript("updateStatus(" + escapedResultText + ");");
                }
            });
        });
    }

    public void authenticateUser(String username, String password) {
        if (username.equals("admin") && password.equals("admin")) {
            loadMonitorPage("[]"); // Pass real data here if needed
        } else {
            webEngine.executeScript("document.getElementById('error').style.display = 'block';");
        }
    }
    
    public void loadGetGuiPage() {
        Platform.runLater(() -> {
            String filePath = new File("resources/about.html").toURI().toString();
            webEngine.load(filePath);

            webEngine.getLoadWorker().stateProperty().addListener((obs, oldState, newState) -> {
                if (newState.toString().equals("SUCCEEDED")) {
                    JSObject window = (JSObject) webEngine.executeScript("window");
                    window.setMember("javaObject", new JavaBridge(this));
                }
            });
        });
    }

    public void performSnmpGet(String community, String ipAddress, String oids) {
        new Thread(() -> {
            try {
                System.out.println("Performing SNMP GET with Community: " + community + ", IP Address: " + ipAddress + ", OIDs: " + oids);
                String resultText = SnmpUtils.performSnmpGet(community, ipAddress, oids);
                System.out.println("SNMP GET result: " + resultText); // Log result in Java console

                Platform.runLater(() -> {
                    String escapedResultText = escapeJavaScript(resultText);
                    // Ensure JavaScript updateResult function is being called
                    System.out.println("Executing JavaScript to update result with: " + escapedResultText);
                    webEngine.executeScript("if (typeof updateResult === 'function') { updateResult(" + escapedResultText + "); } else { console.log('updateResult is not defined'); }");
                });
            } catch (Exception e) {
                System.out.println("Exception during SNMP GET: " + e.getMessage());
                e.printStackTrace();
            }
        }).start();
    }

//=====================================================
// SNMPSET BLOCK START
//=====================================================
 // Method for SNMP SET
 public void performSnmpSet(String setCommunity, String setIpAddress, String setOid, String setValue) {
    new Thread(() -> {
        try {
            System.out.println("Performing SNMP SET with Community: " + setCommunity + ", IP Address: " + setIpAddress + ", OID: " + setOid + ", Value: " + setValue);
            String resultText = SnmpUtils.performSnmpSet(setCommunity, setIpAddress, setOid, setValue);
            System.out.println("SNMP SET result: " + resultText);

            Platform.runLater(() -> {
                String escapedResultText = escapeJavaScript(resultText);
                webEngine.executeScript("if (typeof updateResult === 'function') { updateResult(" + escapedResultText + "); } else { console.log('updateResult is not defined'); }");
            });
        } catch (Exception e) {
            System.out.println("Exception during SNMP SET: " + e.getMessage());
            e.printStackTrace();
        }
    }).start();
}
//=====================================================
// SNMPSET BLOCK END
//=====================================================
    private String escapeJavaScript(String text) {
        if (text == null) {
            return "''";
        }
        return "'" + text.replace("\\", "\\\\")
                         .replace("'", "\\'")
                         .replace("\n", "\\n")
                         .replace("\r", "\\r")
                         .replace("\t", "\\t") + "'";
    }

    public static void main(String[] args) {
        launch(args);
    }
}
