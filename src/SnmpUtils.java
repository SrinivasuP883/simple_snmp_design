import org.snmp4j.CommunityTarget;
import org.snmp4j.PDU;
import org.snmp4j.Snmp;
import org.snmp4j.TransportMapping;
import org.snmp4j.event.ResponseEvent;
import org.snmp4j.mp.SnmpConstants;
import org.snmp4j.transport.DefaultUdpTransportMapping;
import org.snmp4j.smi.*;

import java.io.IOException;

public class SnmpUtils {


//=========================================================================================
// SNMPGET DATA BLOCK START
//=========================================================================================

    public static String performSnmpGet(String community, String ipAddress, String oids) {
        Snmp snmp = null;
        TransportMapping<UdpAddress> transport = null;
        try {
            System.out.println("Performing SNMP GET with Community: " + community + ", IP Address: " + ipAddress + ", OIDs: " + oids);
    
            transport = new DefaultUdpTransportMapping();
            CommunityTarget<UdpAddress> target = new CommunityTarget<>();
            target.setCommunity(new OctetString(community));
            target.setAddress(new UdpAddress(ipAddress + "/161"));
            target.setVersion(SnmpConstants.version2c);
    
            snmp = new Snmp(transport);
            transport.listen();
    
            PDU pdu = new PDU();
            for (String oid : oids.split(",")) {
                pdu.add(new VariableBinding(new OID(oid)));
            }
            pdu.setType(PDU.GET);
    
            ResponseEvent response = snmp.get(pdu, target);
            PDU responsePDU = response.getResponse();
    
            if (responsePDU != null && responsePDU.getErrorStatus() == PDU.noError) {
                StringBuilder result = new StringBuilder();
                for (VariableBinding vb : responsePDU.getVariableBindings()) {
                    // result.append(vb.getOid().toString()).append(": ").append(vb.getVariable().toString()).append("\n");
                    result.append(vb.getVariable().toString()).append("\n");

                }
                String resultStr = result.toString().trim();
                System.out.println("SNMP GET result: " + resultStr);
                return resultStr;
            } else {
                String error = responsePDU != null ? responsePDU.getErrorStatusText() : "No response";
                System.out.println("SNMP GET error: " + error);
                return "Error: " + error;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "IOException: " + e.getMessage();
        } catch (Exception e) {
            e.printStackTrace();
            return "Exception: " + e.getMessage();
        } finally {
            // Clean up resources
            try {
                if (snmp != null) {
                    snmp.close();
                }
                if (transport != null) {
                    transport.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
//=========================================================================================
// SNMPGET DATA BLOCK END
//=========================================================================================

//=========================================================================================
// SNMPSET DATA BLOCK START
//=========================================================================================
public static String performSnmpSet(String setCommunity, String setIpAddress, String setOid, String setValue) {
    Snmp snmp = null;
    TransportMapping<UdpAddress> transport = null;
    try {
        System.out.println("Performing SNMP SET with Community: " + setCommunity + ", IP Address: " + setIpAddress + ", OID: " + setOid + ", Value: " + setValue);

        transport = new DefaultUdpTransportMapping();
        CommunityTarget<UdpAddress> target = new CommunityTarget<>();
        target.setCommunity(new OctetString(setCommunity));
        target.setAddress(new UdpAddress(setIpAddress + "/161"));
        target.setVersion(SnmpConstants.version2c);

        snmp = new Snmp(transport);
        transport.listen();

        PDU pdu = new PDU();
        pdu.add(new VariableBinding(new OID(setOid), new OctetString(setValue)));
        pdu.setType(PDU.SET);

        ResponseEvent response = snmp.set(pdu, target);
        PDU responsePDU = response.getResponse();

        if (responsePDU != null && responsePDU.getErrorStatus() == PDU.noError) {
            return "SNMP SET succeeded";
        } else {
            String error = responsePDU != null ? responsePDU.getErrorStatusText() : "No response";
            return "Error: " + error;
        }
    } catch (IOException e) {
        e.printStackTrace();
        return "IOException: " + e.getMessage();
    } catch (Exception e) {
        e.printStackTrace();
        return "Exception: " + e.getMessage();
    } finally {
        // Clean up resources
        try {
            if (snmp != null) {
                snmp.close();
            }
            if (transport != null) {
                transport.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
//=========================================================================================
// SNMPSET DATA BLOCK START
//=========================================================================================

}
