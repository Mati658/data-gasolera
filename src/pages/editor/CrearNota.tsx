import './crearNota.css'
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoader } from '../../context/LoaderContext';

export default function CrearNota() {
  const intervalRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [notaEditar, setNotaEditar] = useState(location.state?.nota || null)
  const usuario = localStorage.getItem('usuario')
  const editorRef:any = useRef(null);
  const { altaDB, update } = useDatabase()
  const { setLoader } = useLoader();
  const [flagVistPrevia, setFlagVistaPrevia] = useState(true)
  const [nota, setNota] = useState<any>(localStorage.getItem('nota') != null ? localStorage.getItem('nota') : localStorage.getItem('notaBackUp'));
// console.log(notaEditar)
  const log = () => {
    if (editorRef.current) {
      setNota(editorRef.current.getContent())
      setNotaEditar(null)
    }
  };

  const guardadoAutomatico = () =>{
     intervalRef.current = setInterval(() => {
      if (editorRef.current) {
        localStorage.setItem('notaBackUp', editorRef.current.getContent());
        // console.log('Guardado...');
      }
    }, 30000);
  }

  useEffect(()=>{
    if (!usuario) {
      navigate('/');
    }
    guardadoAutomatico();

    return () => {
      clearInterval(intervalRef.current);
      // console.log('Intervalo limpiado');
    };
  },[])

  if (flagVistPrevia) {
    
    return (
      <>
      <div className='container-editor'>
        <Editor
          tinymceScriptSrc='/tinymce/tinymce.min.js'
          onInit={(_evt:any, editor:any) => editorRef.current = editor}
          initialValue={notaEditar ? notaEditar.texto : nota}
          init={{
            skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
            selector: '#editor',
            browser_spellcheck: true,
            contextmenu: 'link image inserttable | cell row column deletetable',
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
              // console.log('Saved');
              // console.log(localStorage.getItem('nota'));
            },
            save_oncancelcallback: () => {
                // console.log('Save Eliminado');
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
                  editor.windowManager.open({
                    title: 'Publicar nota',
                    body: {
                      type: 'panel',
                      items: [
                        {
                          type: 'input',
                          name: 'titulo',
                          label: 'Título de la nota',
                          value: 'prueba'
                        }
                      ]
                    },
                    initialData: {
                      titulo: notaEditar ? notaEditar.titulo : ''
                    },
                    buttons: [
                      {
                        type: 'cancel',
                        text: 'Cancelar'
                      },
                      {
                        type: 'submit',
                        text: 'Publicar',
                        primary: true
                      }
                    ],
                    onSubmit: async function (res:any) {
                      const data = res.getData();
                      // console.log(data)
                      const titulo = data.titulo;

                      if (!editorRef.current.getContent()) {
                        res.close();
                        return;
                      }

                      const notaJson = {
                        titulo,
                        texto: editorRef.current.getContent(),
                        time: new Date()
                      };
                      // console.log(notaJson)
                      if (notaEditar) {
                        setLoader(true)
                        if (await update('notas', notaJson, notaEditar.id)) {
                          localStorage.removeItem('nota');
                          localStorage.removeItem('notaBackUp');
                        }
                        setLoader(false)
                        res.close();
                        return;
                      }
                      if (await altaDB('notas', notaJson)) {
                        setLoader(true)
                        localStorage.removeItem('nota');
                        localStorage.removeItem('notaBackUp');
                      }
                      setLoader(false)
                      res.close();
                    }
                  });
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
