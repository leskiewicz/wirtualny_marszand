import 'package:flutter/material.dart';


class Img{
  final int user_id;
  final String img_id;

  const Img(this.user_id, this.img_id);
}

class GalleryPage extends StatefulWidget{
  final int? whos_id;
  const GalleryPage(
  {Key? key, this.whos_id}
      ): super(key:key);


  static String tag = 'gallery-page';
  @override
  _GalleryPageState createState() => _GalleryPageState();
}

class _GalleryPageState extends State<GalleryPage>{




  final ButtonStyle raisedButtonStyle = ElevatedButton.styleFrom(
    onPrimary: Colors.green,
    padding: EdgeInsets.all(12),
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(24)),
    ),
  );
  @override
  void initState(){
    super.initState();

  }


  @override
  Widget build(BuildContext context){
    var length = 18;

    final galleryImg = Container(
      padding: const EdgeInsets.all(8),
      child: Image.network('https://googleflutter.com/sample_image.jpg'),
    );
    final imgList = List.generate(length, (i) => Img(i,'') ); // i = obraz_id,


    final galleryView = GridView.count(
      primary: false,
        padding: EdgeInsets.symmetric(vertical: 14.0),
      crossAxisSpacing:10,
      mainAxisSpacing:10,
      crossAxisCount:3,


    );

    return Scaffold(
      appBar: AppBar(
        title: Text('Galeria'),
      ),
      backgroundColor: Colors.white,
      body:Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0,right: 24.0),
          children: <Widget>[

          ]
        ),
      ),
    );

  }
}