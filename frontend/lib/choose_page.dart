import 'package:flutter/material.dart';
import 'home_page.dart';
import 'scan_qr.dart';


class ChoosePage extends StatefulWidget {
  static String tag = 'choose-page';
  @override
  _ChoosePageState createState() => _ChoosePageState();
}

class _ChoosePageState extends State<ChoosePage> {

  final ButtonStyle raisedButtonStyle = ElevatedButton.styleFrom(
    onPrimary: Colors.green,
    //primary: Colors.lightGreenAccent,
    //minimumSize: Size(88, 36),
    padding: EdgeInsets.all(12),
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(24)),
    ),
  );


  @override
  Widget build(BuildContext context) {


    final KlientButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: ElevatedButton(
        style: raisedButtonStyle,
        onPressed: () {
          Navigator.of(context).pushNamed(ScanQrPage.tag);
        },
        child: Text(
          "Klient",
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );

    final ArtistButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: ElevatedButton(
        style: raisedButtonStyle,
        onPressed: () {
          Navigator.of(context).pushNamed(HomePage.tag);
        },
        child: Text(
          "Artysta",
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );

    final HoetellButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: ElevatedButton(
        style: raisedButtonStyle,
        onPressed: () {
          Navigator.of(context).pushNamed(HomePage.tag);
        },
        child: Text(
          "Hotel",
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );


    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[

            SizedBox(height: 48.0),
            KlientButton,
            ArtistButton,
            HoetellButton,

          ],
        ),
      ),
    );
  }
}
