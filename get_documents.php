<?php
$dir = __DIR__; // Get the current directory

$files = array_diff(scandir($dir), array('..', '.'));

// Filter out non-document files (you can customize this filter)
$allowedExtensions = ['txt', 'pdf', 'doc', 'docx'];
$documentFiles = array_values(array_filter($files, function ($file) use ($allowedExtensions) {
    $extension = pathinfo($file, PATHINFO_EXTENSION);
    return in_array(strtolower($extension), $allowedExtensions);
}));

// Return the document list as JSON
header('Content-Type: application/json');
echo json_encode($documentFiles);
?>
