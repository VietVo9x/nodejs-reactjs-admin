import { Card, CardMedia, FormHelperText, Input, Stack } from "@mui/material";

export default function UpdateImgages(props: any) {
  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      props.setNewImages(fileList);
    }
  };
  return (
    <div>
      <Input type="file" inputProps={{ multiple: true }} onChange={(e) => handleFileChange(e)} />

      <Stack direction="row" spacing={2}>
        {props.newImages.map((file: File, index: number) => (
          <Card key={index} sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image={URL.createObjectURL(file)} // Hiển thị ảnh tạm thời từ file đã chọn
              alt={`Preview ${index}`}
              sx={{
                objectFit: "cover",
              }}
            />
          </Card>
        ))}
      </Stack>
      <FormHelperText style={{ color: "red" }}>{props.errorForm?.msgImage}</FormHelperText>
    </div>
  );
}
