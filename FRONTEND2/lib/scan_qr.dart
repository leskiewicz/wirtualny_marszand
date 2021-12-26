import 'dart:async';


import 'package:barcode_scan2/barcode_scan2.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';


class ScanQrPage extends StatefulWidget {
  static String tag = 'scan_qr-page';
  @override
  _ScanQrPageState createState() => _ScanQrPageState();
}

class _ScanQrPageState extends State<ScanQrPage> {
  ScanResult? scanResult;

  static final _possibleFormats = BarcodeFormat.values.toList()
    ..removeWhere((e) => e == BarcodeFormat.unknown);

  List<BarcodeFormat> selectedFormats = [..._possibleFormats];

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
              SizedBox(height:425.0),
              CameraIcon,
            ],
          ),
        ),
      );

  }

  Future<void> _scan() async {
    try {
      final result = await BarcodeScanner.scan(

      );
      setState(() => scanResult = result);
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
}