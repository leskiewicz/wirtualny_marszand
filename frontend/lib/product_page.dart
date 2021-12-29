import 'package:flutter/material.dart';
import 'home_page.dart';
import 'dart:async';
import 'package:barcode_scan2/barcode_scan2.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import 'product_page.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;



class ProductPage extends StatefulWidget {

  final String? url;
  const ProductPage(
  {Key? key, this.url}
      ):super(key:key);

  static String tag = 'product-page';

  @override
  _ProductPageState createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  var userId;
  var title;
  var completed;




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
  void initState() {
    super.initState();
    getData(widget.url);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        title: Text('Kot na pustyni'), //nazwa obrazu
      ),
      backgroundColor: Colors.white,
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[

            Container(
              child: Text(
                userId != null ? 'UserID is $userId' : 'UserID Loading',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
            Container(
              child: Text(
                title != null ? 'title is $title' : 'Title Loading',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
            Container(
              child: Text(
                completed != null ? 'Task Completed is $completed' : 'Task status loading',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),

            Text('Przyklad obrazu'),
            // nazwa obrazu
            Text('Twoja Stara'),
            //imie i nazwisko autora
            Image.network('https://googleflutter.com/sample_image.jpg'),
            // link do zdjecia


          ],
        ),
      ),
    );
  }

  getData(rawdata) async {
    var url = Uri.parse(rawdata);
    http.Response response = await http.get(url);

    if (response.statusCode == 200) {
      var results = jsonDecode(response.body);

      setState(() {
        this.userId = results['userId'];
        this.title = results['title'];
        this.completed = results['completed'];
      });
    }
    else {
      print('Erroro');
    }
  }
}
