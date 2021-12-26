import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {

  static String tag = 'home-page';

  @override
  Widget build(BuildContext context) {

    const alucard = Hero(
      tag: 'hero',
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: CircleAvatar(
          radius: 72.0,
          backgroundColor: Colors.transparent,
          backgroundImage: AssetImage('assets/alucard.jpg'),
        ),
      ),
    );

    const welcome = Padding(
        padding: EdgeInsets.all(8.0),
      child: Text(
        'Welcome Abhishek Yadav',
        style: TextStyle(
          fontSize: 28.0,
          color: Colors.white,
        ),
      ),
    );

    const lorem =  Padding(
      padding: EdgeInsets.all(8.0),
      child: Text(
        'Mr. Abhishek Yadav we are very glad to see you here and Thanks to your Black Tech Studio Developers team.',
        style: TextStyle(
          fontSize: 16.0,
          color: Colors.white,
        ),
      ),
    );

    final body = Container(
      width: MediaQuery.of(context).size.width,
      padding: EdgeInsets.all(28.0),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.green,
            Colors.lightGreen,
          ],
        ),
      ),
      child: Column(
        children: <Widget>[
          alucard, welcome, lorem,
        ],
      ),
    );

    return Scaffold(
      body: body,
    );
  }
}
