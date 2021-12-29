import 'dart:async';
import 'package:barcode_scan2/barcode_scan2.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import 'product_page.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ScanQrPage extends StatefulWidget {
  static String tag = 'scan_qr-page';
  @override
  _ScanQrPageState createState() => _ScanQrPageState();
}

class _ScanQrPageState extends State<ScanQrPage> {
  ScanResult? scanResult;
  var userId;
  var title;
  var completed;



  static final _possibleFormats = BarcodeFormat.values.toList()
    ..removeWhere((e) => e == BarcodeFormat.unknown);

  List<BarcodeFormat> selectedFormats = [..._possibleFormats];

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

  }

  @override
  Widget build(BuildContext context) {
    final scanResult = this.scanResult;

    final CameraIcon = IconButton(
      onPressed: _scan,
      icon: const Icon(Icons.camera),
      tooltip: 'Scan',
      iconSize: 75.0,
    );

    final PH_productPage = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: ElevatedButton(
        style: raisedButtonStyle,
        onPressed: (){
          Navigator.of(context).pushNamed(ProductPage.tag);
        },
        child: Text(
          "Product Page",
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );

      return Scaffold(
        appBar: AppBar(
          title: const Text('Scan this Shit'),
        ),
        backgroundColor: Colors.white,
        body: Center(
          child: ListView(
            shrinkWrap: true,
            padding: EdgeInsets.only(left:24.0, right: 24.0),
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
              if(scanResult != null)
                ListTile(
                  title: const Text('Raw Content'),
                  subtitle: Text(scanResult.rawContent),
                ),
                PH_productPage,



              SizedBox(height:425.0),
              CameraIcon,

            ],
          ),
        ),
      );


  }


  Future<void> _scan() async {
    try {
      final result = await BarcodeScanner.scan();
      setState(() => scanResult = result);
      getData(scanResult?.rawContent);

      Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => ProductPage(url : scanResult?.rawContent)),
      );


      //_launchURL(scanResult?.rawContent);
    } on PlatformException catch (e) {
      setState(() {
        scanResult = ScanResult(
          type: ResultType.Error,
          format: BarcodeFormat.unknown,
          rawContent: e.code == BarcodeScanner.cameraAccessDenied
              ? 'The user did not grant the camera permission!'
              : 'Unknown error: $e',
        );
      });
    }
  }

  void _launchURL(_url) async {
    if (!await launch(_url)) throw 'Could not launch $_url';
  }
  getData(rawdata) async{
    var url=Uri.parse(rawdata);
    http.Response response = await http.get(url);

    if(response.statusCode == 200){
      var results = jsonDecode(response.body);

      setState((){
        this.userId = results['userId'];
        this.title = results['title'];
        this.completed = results['completed'];
      });
    }
    else{
      print('Erroro');
    }

  }

}
