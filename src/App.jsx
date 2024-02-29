import { useState } from 'react'
import './styles.css'
import TopText from './components/TopText'

export default function App() {
  /* Challenge
    
    Dosya girişi henüz tam olarak ayarlanmadı. Göreviniz bunu aşağıdaki gibi tamamlamaktır:
  
    	1. Aşağıdaki 37. satırda yer alan <input /> elementi, zorunlu input olacak şekilde değiştirilmelidir:
        	- gerekli bir input olacak.
        	- kullanıcının aynı anda yüklemek için birden fazla dosya seçmesine izin verir. 
        	- kullanıcının yalnızca pdf, jpg, jpeg veya png dosyalarını seçmesine izin verir. 
        	- Bir sonraki gereksinimde açıklandığı şekilde bir input değişikliği tespit ettiğinde filesToUpload state'ini günceller. 


          
    	2. Kullanıcı yüklenecek dosyaları seçtiğinde, filesToUpload state'i kullanıcının seçtiği her dosya için bir nesne içeren bir array olacak şekilde güncellenmelidir. Her nesne 3 özelliğe sahip olmalıdır: fileName, fileType ve fileSize, değerleri olarak ilgili bilgilerle birlikte. Örneğin: {fileName: "example-file.jpeg", fileType: "image/jpeg", fileSize: 8752474}. 
          
    	3. "Dosya Seç" butonuna tıklayarak ve birden fazla dosya seçerek kodunuzu test edin. " Upload" butonuna tıkladığınızda, filesToUpload state array konsolundaki her nesnenin doğru bilgilerle kaydedildiğini görmelisiniz. (Bunun için kod zaten ayarlanmıştır.) 
	   
	Not: Kodunuzu test etmek için test-files klasöründeki dosyaları kullanabilirsiniz (klasördeki README.md dosyasına bakın). 
       
*/ 
  // // Bu state, yüklenen dosyaların bilgilerini saklayacak.
  const [filesToUpload, setFilesToUpload] = useState([])

  // // Bu fonksiyon, dosya yükleme işlemi gerçekleştiğinde tetiklenir. Seçilen dosyaları alır ve izin verilen dosya türlerini tanımlar.
  const fileHandler = (e) => {
      const selectedFiles =e.target.files
      // // yüklenen dosyaların kabul edilebilir türlerini belirtir.
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
      
      
      // // Her bir seçilen dosya için yeni bir nesne  oluşturuyoruz. Bu nesneler dosyanın adını, türünü ve boyutunu içeriyor.
      const updateFiles =Array.from(selectedFiles).map((selectedFile) =>(
        {
          ...selectedFiles,
          fileName: selectedFile.name,
          fileType: selectedFile.type,  
          fileSize: selectedFile.size 
        }
        ))
        // // Dosya listesini güncelle
        setFilesToUpload([...filesToUpload,...updateFiles])
      }

    // //"handleSubmit" fonksiyonu, form gönderildiğinde çağrılır ve dosya bilgilerini konsola yazdırır.
        function handleSubmit(e) {
          e.preventDefault()
          filesToUpload.forEach((file) => console.log(file))
      }


  return (

    <form onSubmit={handleSubmit} >
      <TopText />

      <input
       type='file' 
       name='dosya'
       // // zorunlu bir input.
       required
       // // birden fazla dosya seçilmesine olanak tanır.
       multiple
       // // dosya girişinin kabul etmesi gereken dosya türlerini tanımlayan bir dizedir.
       accept='.pdf,.jpg,.jpeg,.png'
       // //Dosya seçimi yapıldığında "fileHandler" fonksiyonu tetiklenir.
       onChange={fileHandler}
       />

      <button>Upload </button>
    </form>
  )
}
// // Bu iki kavram birbirini tamamlayıcıdır: allowedTypes dizisi, işlemi kabul edilebilir dosya türlerine göre yönetirken, accept özelliği kullanıcının sadece belirli dosya türlerini seçebilmesini sağlar.
