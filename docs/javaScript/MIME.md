# MIME 类型

&emsp;&emsp;当我们的浏览器要显示或处理某些资源的时候，我们并不知道其响应的数据是什么类型的，为了区分这些资源类型，就需要用到 MIME 了。HTTP 会为每一个通过 web 传输的对象添加上 MIME 类型的数据格式标签。**浏览器在读取到对应的信息后，会调用相应的程序去处理它**，任何得到我们想要的结果。

&emsp;&emsp;最早的 HTTP 协议中，并没有附加的数据类型信息，所有传送的数据都被客户程序解释为超文本标记语言 HTML 文档，而为了支持多媒体数据类型，HTTP 协议中就使用了附加在文档之前的 MIME 数据类型信息来**标识数据类型**。

&emsp;&emsp;MIME 意为多功能 Internet 邮件扩展，它设计的最初目的是为了在发送电子邮件时附加多媒体数据，让邮件客户程序能根据其类型进行处理。然而当它被 HTTP 协议支持之后，它的意义就更为显著了。**它使得 HTTP 传输的不仅是普通的文本，而变得丰富多彩**。

&emsp;&emsp;每个 MIME 类型由两部分组成，前面是数据的大类别，例如声音 audio、图象 image 等，后面定义具体的种类。

**七种大类别：**

video

image

application

text

audio

multipart

message

**常见的 MIME 类型(通用型)：**
文件类型|后缀| MIME
-| - | -
超文本标记语言文本| .html| text/html
xml 文档| .xml| text/xml|
XHTML 文档| .xhtml| application/xhtml+xml|
普通文本| .txt| text/plain|
RTF 文本| .rtf| application/rtf|
PDF 文档 |.pdf| application/pdf|
Microsoft Word 文件 |.word |application/msword|
PNG 图像 |.png| image/png|
GIF 图形 |.gif |image/gif|
JPEG 图形| .jpeg,.jpg| image/jpeg|
au 声音文件 |.au| audio/basic|
MIDI 音乐文件| mid,.midi| audio/midi,audio/x-midi|
RealAudio 音乐文件 |.ra, .ram| audio/x-pn-realaudio|
MPEG 文件 |.mpg,.mpeg| video/mpeg|
AVI 文件 |.avi| video/x-msvideo|
GZIP 文件| .gz |application/x-gzip|
TAR 文件 |.tar| application/x-tar|
任意的二进制数据| - | application/octet-stream|
