import javax.swing.*;
import java.io.*;
import java.net.*;
import java.util.Date;
import java.util.Scanner;

public class client {
       public static void main(String[] args) 
                    throws UnknownHostException, IOException {
        Socket cliente = new Socket("127.0.0.1", 1234);
        System.out.println("O cliente se conectou ao servidor!");

        Scanner teclado = new Scanner(System.in);
        PrintStream saida = new PrintStream(cliente.getOutputStream());

        while (teclado.hasNextLine()) {
            saida.println(teclado.nextLine());
        }

        saida.close();
        teclado.close();
        cliente.close();
    }
}
