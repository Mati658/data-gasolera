import './crearNota.css'
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';

export default function CrearNota() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario')
  const editorRef:any = useRef(null);
  const { altaDB } = useDatabase()
  const [flagVistPrevia, setFlagVistaPrevia] = useState(true)
  const [nota, setNota] = useState<any>(localStorage.getItem('nota') != null ? localStorage.getItem('nota') : localStorage.getItem('notaBackUp'));
// console.log(localStorage.getItem('nota'))
  const log = () => {
    if (editorRef.current) {
      setNota(editorRef.current.getContent())
    }
  };

  const guardadoAutomatico = () =>{
    setInterval(() => {
      localStorage.setItem('notaBackUp', editorRef.current.getContent());
    }, 30000);
  }

  useEffect(()=>{
    if (!usuario) {
      navigate('/');
    }
    guardadoAutomatico();
  },[])

  if (flagVistPrevia) {
    
    return (
      <>
      <div className='container-editor'>
        <Editor
          tinymceScriptSrc='/tinymce/tinymce.min.js'
          onInit={(_evt:any, editor:any) => editorRef.current = editor}
          initialValue={nota}
          init={{
            skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
            height:'100%',
            menubar: false,
            branding: false,
            language:'es_MX',
            plugins: [
              'advlist', 'autolink', 'autosave', 'fullscreen', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount', 'save'
            ],
            toolbar_mode: 'sliding',
            toolbar: 'undo redo | styles ' +
              'fontfamily fontsize |'+
              'bold italic forecolor backcolor | alignleft aligncenter  ' +
              'alignright alignjustify | bullist numlist outdent indent lineheight | ' +
              'image table | fullscreen upload preview cancel save | removeformat help ',
            font_family_formats: `
                lucidity=lucidity;
                Arial=arial,helvetica,sans-serif;
                Times New Roman=times new roman,times;
                Courier New=courier new,courier;
                Georgia=georgia,palatino;
                Tahoma=tahoma,arial;
                Verdana=verdana,geneva;
                Comic Sans MS=comic sans ms,sans-serif;
                Roboto=Roboto,sans-serif;`,            
            font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
            line_height_formats: '0.5 1 1.2 1.4 1.6 2',
            statusbar:false,
            content_style: `
              @font-face {
                font-family: "lucidity";
                src: url("/src/assets/fonts/lucidity-condensed.ttf");
              }
              body {
                font-family: Arial, sans-serif;
                max-width: 100%;
                min-width: 95%;
                min-height: 700px;
                box-sizing: border-box;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
                padding:5%
              }`,
            save_enablewhendirty: false,
            save_onsavecallback: () => {
              localStorage.setItem('nota', editorRef.current.getContent());
              console.log('Saved');
              console.log(localStorage.getItem('nota'));
            },
            save_oncancelcallback: () => {
                console.log('Save Eliminado');
                localStorage.removeItem('nota');
                localStorage.removeItem('notaBackUp');
            },
            setup: function (editor:any) {
              editor.ui.registry.addButton('preview', {
                icon: 'Preview',
                tooltip: 'Preview',
                onAction: function () {
                  setFlagVistaPrevia(!flagVistPrevia);
                  log()
                },
              });

              editor.ui.registry.addButton('upload', {
                icon: 'Upload',
                tooltip: 'Publicar',
                onAction: async function () {
                  if (!editorRef.current.getContent()) {
                    return;
                  }
                  const notaJson = {
                    texto:editorRef.current.getContent(),
                    time: new Date()
                  }
                  if (await altaDB('notas', notaJson)) {
                    localStorage.removeItem('nota');
                    localStorage.removeItem('notaBackUp');
                  }
                },
              });
            },
          }}
        />
      </div>
        <div className='gap'></div>
      </>
    );
  }

  return(
    <div className='container-vista-prev'>
      <div className='vista-previa' dangerouslySetInnerHTML={{ __html: nota || '' }}>

      </div>
      <button className='btn-editor abs' onClick={()=>setFlagVistaPrevia(!flagVistPrevia)}>Editor</button>
    </div>
  )
}
